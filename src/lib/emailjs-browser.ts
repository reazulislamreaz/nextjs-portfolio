export interface BrowserEmailPayload {
  user_name: string;
  user_email: string;
  message: string;
  time: string;
}

function getBrowserEmailJsConfig() {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey };
}

export async function sendEmailJsFromBrowser(
  payload: BrowserEmailPayload,
): Promise<void> {
  const config = getBrowserEmailJsConfig();

  if (!config) {
    throw new Error("EmailJS browser credentials are not configured.");
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
    throw new Error(text || `EmailJS responded with ${response.status}`);
  }
}
