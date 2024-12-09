import express from "express";
import { createHotel, getHotels, getHotelById, updateHotel, deleteHotel } from "./../application/hotel";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware";
import { createEmbeddings } from "./../application/embedding";
import { retrieveHotels } from "../application/retrieve";

const hotelsRouter = express.Router();

// Routes for hotels
hotelsRouter
  .route("/")
  .post(createHotel) // Protected route for creating a hotel
  .get(getHotels); // Public route to get all hotels

hotelsRouter
  .route("/:id")
  .get(getHotelById) // Public route to get a single hotel by ID
  .put(ClerkExpressRequireAuth({}), AuthorizationMiddleware, updateHotel) // Protected route for updating a hotel
  .delete(ClerkExpressRequireAuth({}), AuthorizationMiddleware, deleteHotel); // Protected route for deleting a hotel

hotelsRouter.route("/embeddings/create").post(createEmbeddings);
hotelsRouter.route("/search/retrieve").get(retrieveHotels); 

export default hotelsRouter;
