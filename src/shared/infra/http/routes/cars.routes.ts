import multer from "multer";
import { Router } from "express";

import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import uploadConfig from "@config/upload";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated,ensureAdmin,createCarController.handle);
carsRoutes.get("/available",listAvailableCarsController.handle);
carsRoutes.post("/specifications/:id",ensureAuthenticated,ensureAdmin,createCarsSpecificationController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated,ensureAdmin,upload.array("images"),uploadCarImagesController.handle);

export { carsRoutes };
