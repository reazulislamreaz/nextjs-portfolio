function getEmailJsConfig() {
  const serviceId =
    process.env.EMAILJS_SERVICE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId =
    process.env.EMAILJS_TEMPLATE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey };
}

export interface ContactPayload {
  user_name: string;
  user_email: string;
  message: string;
  time: string;
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const config = getEmailJsConfig();
  if (!config) {
    throw new Error("Email service is not configured.");
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      template_params: payload,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Email provider responded with ${response.status}`);
  }
}

export function isEmailJsConfigured(): boolean {
  return getEmailJsConfig() !== null;
}
