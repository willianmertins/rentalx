import { Router } from "express";

import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationController = new CreateCarSpecificationController();

carsRoutes.post("/", ensureAuthenticated,ensureAdmin,createCarController.handle);
carsRoutes.get("/available",listAvailableCarsController.handle);
carsRoutes.post("/specifications/:id",ensureAuthenticated,ensureAdmin,createCarsSpecificationController.handle);

export { carsRoutes };