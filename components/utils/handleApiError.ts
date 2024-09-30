import { ApiError, RedirectError } from "./ErrorUtils";

export const handleApiError = (
  error: unknown
): { status: number; message: string; location?: string } => {
  if (error instanceof ApiError) {
    // Custom application error
    return { status: error.status, message: error.message };
  } else if (error instanceof RedirectError) {
    // Redirect error
    return {
      status: error.status,
      message: error.message,
      location: error.location,
    };
  } else if (error instanceof Error) {
    // Check for specific error messages
    if (error.message.includes("Json deserialize error")) {
      return {
        status: 400,
        message: "Invalid data format received from the server.",
      };
    } else if (error.message.includes("Old password is incorrect")) {
      return { status: 400, message: "Old password is incorrect" };
    } else if (error.message.includes("HTTP error! status:")) {
      // Extract status and message from the error string
      const statusMatch = error.message.match(/status: (\d+)/);
      const messageMatch = error.message.match(/message: (.+)/);
      const status = statusMatch ? parseInt(statusMatch[1], 10) : 400;
      let message = messageMatch ? messageMatch[1] : "An error occurred.";

      // Attempt to parse the JSON string
      try {
        const jsonMessage = JSON.parse(message);
        message = jsonMessage.message || "An error occurred.";
      } catch (e) {
        // If parsing fails, use the original message
        message = message;
        console.log(e);
      }

      return { status, message };
    } else {
      return { status: 400, message: error.message };
    }
  } else {
    // Fallback for unexpected error types
    return { status: 500, message: "An unexpected error occurred." };
  }
};