import nodemailer from "nodemailer";

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `New Contact: ${body.subject}`,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: body.email,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: body.email,
      subject: "We received your message",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${body.name},</p>
        <p>I've received your message and will get back to you soon.</p>
      `,
    });

    return Response.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}