import Hotel from "./../infrastructure/schemas/hotel";
import NotFoundError from "./../domain/errors/not-found-error"; // Update with your custom error imports
import { createHotelDTO, updateHotelDTO } from "./../domain/dto/hotel"; // Import Zod schemas
import { NextFunction, Request, Response } from "express"; // Import Express types
import { sleep } from "../utils";

// Create a new hotel
export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body using Zod schema
    const validatedData = createHotelDTO.parse(req.body);

    const newHotel = new Hotel(validatedData);
    await newHotel.save();
;
    res
      .status(201)
      .json({ message: "Hotel created successfully", hotel: newHotel });
  } catch (error) {
    next(error); // Zod errors or other errors will be handled by the global error handler
  }
};

// Read all hotels
export const getHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find();
    await sleep(1000);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// Read a single hotel by ID
export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      throw new NotFoundError("Hotel not found.");
    }

    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// Update a hotel by ID
export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Validate the request body using Zod schema
    const validatedData = updateHotelDTO.parse(req.body);

    const updatedHotel = await Hotel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedHotel) {
      throw new NotFoundError("Hotel not found.");
    }

    res
      .status(200)
      .json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (error) {
    next(error);
  }
};

// Delete a hotel by ID
export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      throw new NotFoundError("Hotel not found.");
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    next(error);
  }
};

