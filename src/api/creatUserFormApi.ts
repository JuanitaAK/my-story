import { SignUpFormData } from "@/components/SignUp";

export const createUser = async (user: SignUpFormData) => {
  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user... 😬 please try again later");
  }

  return response.json();
};
