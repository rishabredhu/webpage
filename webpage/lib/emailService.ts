import emailjs from "emailjs-com";

export async function sendEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject || "No Subject",
    message,
  };

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.EMAILJS_USER_ID!,
    );
  } catch (error) {
    throw new Error("Failed to send email");
  }
}
