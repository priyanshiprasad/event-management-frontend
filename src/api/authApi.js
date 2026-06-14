import api from "./axios";

// Register API call
export const registerUser = (data) => api.post("/auth/register", data);

// Login API call
export const loginUser = (data) => api.post("/auth/login", data);

// Resend verification email API call
export const resendVerification = (email) =>
  api.post("/auth/resend-verification", { email });

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (token, newPassword) =>
  api.post("/auth/reset-password", { token, newPassword });