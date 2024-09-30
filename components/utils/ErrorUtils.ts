export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
  
export class RedirectError extends Error {
  status: number;
  location: string;

  constructor(status: number, location: string, message?: string) {
    super(message || `Redirect to ${location}`);
    this.status = status;
    this.location = location;
    this.name = "RedirectError"; // Set the name property for better error identification
  }
}
