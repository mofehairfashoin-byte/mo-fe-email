import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const {
      to, name, service, date, time, location, notes
    } = req.body || {};

    if (!to || !name || !service || !date || !time || !location) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const msg = {
      from: { email: process.env.FROM_EMAIL, name: "Mo & Fe Hair Fashion" },
      to,
      subject: "Afspraakbevestiging",
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamic_template_data: {
        name, service, date, time, location, notes: notes || ""
      },
    };

    await sgMail.send(msg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err?.response?.body || err);
    return res.status(500).json({ ok: false, error: "Send failed" });
  }
}
