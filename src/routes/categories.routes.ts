import { response, Router } from "express";

import { v4 as uuidV4} from "uuid";

import { CategoriesRepository } from "../repositories/CategoriesRepositories";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post("/", (request,response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);
  if(categoryAlreadyExists){
    return response.status(400).json({error: "Category Already exists!"});
  }

  categoriesRepository.create({name,description});

  return response.status(201).send();

});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
})

export { categoriesRoutes };