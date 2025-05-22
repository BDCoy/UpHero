import * as Yup from "yup";

export const signupValidationSchemas = {
  account: Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),
  }),
  contact: Yup.object({
    phone: Yup.string()
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .required("City is required"),
  }),
  goals: Yup.object({
    goals: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one goal")
      .required("Please select at least one goal"),
  }),
};

export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  goals: string[];
};
