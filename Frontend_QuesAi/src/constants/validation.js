export function validateLogin(email, password) {
  if (!email || !password) {
    return { success: false, message: "All fields are required." };
  }

  if (!email.includes("@")) {
    return { success: false, message: "Invalid email format." };
  }

  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters." };
  }

  return { success: true };
}

export function validateSignup(email, password, confirmPassword) {
  if (!email || !password || !confirmPassword) {
    return { success: false, message: "All fields are required." };
  }

  if (!email.includes("@")) {
    return { success: false, message: "Invalid email format." };
  }

  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  return { success: true };
}
