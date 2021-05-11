import { response, Router } from "express";

import { v4 as uuidV4} from "uuid";
import { CreateCategoryService } from "../../services/CreateCategoryServices";
import { CategoriesRepository } from "../repositories/CategoriesRepositories";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post("/", (request,response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute( {name, description} );

  return response.status(201).send();

});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
})

export { categoriesRoutes };