// Backend base URL
export const API_BASE_URL = "http://localhost:8000";

// Max file size (5MB)
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Accepted resume file types
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
];
