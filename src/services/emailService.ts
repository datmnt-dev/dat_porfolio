import { BASE_URL } from "../config/apiConfig.js";

type SendEmailResult = {
  success: boolean;
  message: string;
  id?: string;
};

export const sendEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<SendEmailResult> => {
  try {
    const response = await fetch(`${BASE_URL}/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Unable to send message. Please try again.",
      };
    }

    return {
      success: Boolean(data?.success),
      message: data?.message || "Email sent successfully.",
      id: data?.id,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email" };
  }
};
