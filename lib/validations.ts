import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  company: z
    .string()
    .max(80, "Company name is too long")
    .optional(),
  service: z
    .string()
    .min(1, "Please select a service"),
  budget: z
    .string()
    .optional(),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message is too long"),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type NewsletterValues = z.infer<typeof newsletterSchema>;
