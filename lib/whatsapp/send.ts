// WhatsApp Message Sending Utilities

export async function sendWhatsAppMessage(
  to: string,
  text: string
): Promise<boolean> {
  try {
    if (!process.env.WHATSAPP_PHONE_ID || !process.env.WHATSAPP_ACCESS_TOKEN) {
      console.error("WhatsApp credentials not configured");
      return false;
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to,
          type: "text",
          text: {
            preview_url: false,
            body: text,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("WhatsApp API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}

export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  parameters: string[]
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: "fr",
            },
            components: [
              {
                type: "body",
                parameters: parameters.map((p) => ({
                  type: "text",
                  text: p,
                })),
              },
            ],
          },
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error sending WhatsApp template:", error);
    return false;
  }
}
