import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Allowed origins - restrict CORS to specific domains
const ALLOWED_ORIGINS = [
  "https://id-preview--549febb2-ee5a-42e7-bf57-ee0057bb86c7.lovable.app",
  "https://549febb2-ee5a-42e7-bf57-ee0057bb86c7.lovableproject.com",
  "https://vaymo-agency.lovable.app",
  "https://vaymo-agency.com",
  "https://www.vaymo-agency.com",
  "http://localhost:5173", // Development
  "http://localhost:8080"  // Development
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per IP per hour

// In-memory rate limit store (resets on function cold start, which is acceptable for this use case)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ipAddress: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ipAddress);
  
  // Clean up expired entries
  if (record && now > record.resetTime) {
    rateLimitStore.delete(ipAddress);
  }
  
  const currentRecord = rateLimitStore.get(ipAddress);
  
  if (!currentRecord) {
    // First request from this IP
    rateLimitStore.set(ipAddress, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }
  
  if (currentRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    return { 
      allowed: false, 
      remaining: 0, 
      resetIn: currentRecord.resetTime - now 
    };
  }
  
  // Increment counter
  currentRecord.count++;
  rateLimitStore.set(ipAddress, currentRecord);
  
  return { 
    allowed: true, 
    remaining: MAX_REQUESTS_PER_WINDOW - currentRecord.count, 
    resetIn: currentRecord.resetTime - now 
  };
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// HTML escape function to prevent XSS in email templates
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactEmailRequest {
  name: string;
  company: string;
  email: string;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
}

function validateInputs(data: ContactEmailRequest): ValidationResult {
  const { name, company, email, message } = data;

  // Check for required fields
  if (!name || !company || !email || !message) {
    return { valid: false, error: "All fields are required" };
  }

  // Validate string types
  if (typeof name !== 'string' || typeof company !== 'string' || 
      typeof email !== 'string' || typeof message !== 'string') {
    return { valid: false, error: "Invalid input format" };
  }

  // Length validation
  if (name.trim().length === 0 || name.length > 100) {
    return { valid: false, error: "Name must be between 1 and 100 characters" };
  }
  if (company.trim().length === 0 || company.length > 100) {
    return { valid: false, error: "Company must be between 1 and 100 characters" };
  }
  if (email.trim().length === 0 || email.length > 255) {
    return { valid: false, error: "Email must be between 1 and 255 characters" };
  }
  if (message.trim().length === 0 || message.length > 5000) {
    return { valid: false, error: "Message must be between 1 and 5000 characters" };
  }

  // Email format validation
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                    req.headers.get("x-real-ip") || 
                    "unknown";
  
  // Check rate limit
  const rateLimit = checkRateLimit(ipAddress);
  
  if (!rateLimit.allowed) {
    const retryAfterSeconds = Math.ceil(rateLimit.resetIn / 1000);
    return new Response(
      JSON.stringify({ 
        error: "Too many requests. Please try again later.",
        retryAfter: retryAfterSeconds
      }),
      {
        status: 429,
        headers: { 
          "Content-Type": "application/json",
          "Retry-After": String(retryAfterSeconds),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000)),
          ...corsHeaders 
        },
      }
    );
  }

  try {
    const requestData: ContactEmailRequest = await req.json();
    
    // Server-side validation
    const validation = validateInputs(requestData);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs for HTML embedding
    const safeName = escapeHtml(requestData.name.trim());
    const safeCompany = escapeHtml(requestData.company.trim());
    const safeEmail = escapeHtml(requestData.email.trim());
    const safeMessage = escapeHtml(requestData.message.trim());

    // Send notification email to Nexly
    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Vaymo Website <noreply@vaymo-agency.com>",
        to: ["max@vaymo-agency.com"],
        subject: `Neue Kontaktanfrage von ${safeName} (${safeCompany})`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Inter', -apple-system, sans-serif; background: #0a0f1c; color: #ffffff; padding: 40px; }
              .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; border: 1px solid #374151; }
              h1 { color: #3b82f6; margin-bottom: 24px; }
              .field { margin-bottom: 20px; }
              .label { color: #9ca3af; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
              .value { color: #ffffff; font-size: 16px; }
              .message { background: #1f2937; padding: 20px; border-radius: 8px; margin-top: 24px; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🚀 Neue Kontaktanfrage</h1>
              
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${safeName}</div>
              </div>
              
              <div class="field">
                <div class="label">Unternehmen</div>
                <div class="value">${safeCompany}</div>
              </div>
              
              <div class="field">
                <div class="label">E-Mail</div>
                <div class="value"><a href="mailto:${safeEmail}" style="color: #3b82f6;">${safeEmail}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Nachricht</div>
                <div class="message">${safeMessage}</div>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.text();
      console.error("Failed to send notification email:", errorData);
      // Return generic error message to client
      return new Response(
        JSON.stringify({ error: "Failed to send message. Please try again later." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the sender (using original email, not escaped)
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Vaymo <noreply@vaymo-agency.com>",
        to: [requestData.email.trim()],
        subject: "Wir haben deine Nachricht erhalten! | We received your message!",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Inter', -apple-system, sans-serif; background: #0a0f1c; color: #ffffff; padding: 40px; }
              .container { max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 40px; border: 1px solid #374151; }
              h1 { color: #3b82f6; margin-bottom: 16px; }
              p { color: #d1d5db; line-height: 1.6; }
              .divider { border-top: 1px solid #374151; margin: 24px 0; }
              .signature { color: #9ca3af; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Hallo ${safeName}! 👋</h1>
              
              <p>Vielen Dank für deine Nachricht! Wir haben deine Anfrage erhalten und melden uns in Kürze bei dir.</p>
              
              <div class="divider"></div>
              
              <p>Thank you for reaching out! We've received your message and will get back to you shortly.</p>
              
              <div class="divider"></div>
              
              <p class="signature">
                Mit freundlichen Grüßen / Best regards,<br/>
                <strong style="color: #3b82f6;">Das Vaymo Team</strong>
              </p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      console.error("Failed to send confirmation email:", await confirmationResponse.text());
      // Don't fail the request - notification email was sent successfully
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    // Log detailed error server-side only
    console.error("Error in send-contact-email function:", error);
    
    // Return generic error message to client
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...getCorsHeaders(req.headers.get("origin")) },
      }
    );
  }
};

serve(handler);
