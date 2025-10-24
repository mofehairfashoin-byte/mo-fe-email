import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, service, date, time, location, notes, email } = req.body;

  const msg = {
    to: email,
    from: "contact@mo-fe.nl",
    subject: "Bevestiging van uw afspraak",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px; border-radius:10px;">
        <h2 style="color:#c19b5d;">Mo
