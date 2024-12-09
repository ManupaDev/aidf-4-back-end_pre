import { z } from "zod";

export const createHotelDTO = z.object({
  name: z.string().min(1, "Name is required."),
  location: z.string().min(1, "Location is required."),
  description: z.string().min(1, "Description is required."),
  image: z.string().url("Image must be a valid URL."),
  pricePerNight: z
    .number()
    .positive("Price per night must be a positive number."),
});

export const updateHotelDTO = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url("Image must be a valid URL.").optional(),
  pricePerNight: z
    .number()
    .positive("Price per night must be a positive number.")
    .optional(),
});
