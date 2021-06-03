import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository {
  
  private repository: Repository<Category>;

  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  // //Verifica se existe possui uma instancia criada
  // public static getInstance(): CategoriesRepository {

  //   if(!CategoriesRepository.INSTANCE){
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   return CategoriesRepository.INSTANCE;
  // }

  async create( {name,description} : ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name
    });
  
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    //Select * from categories where name = "name" limit (Como busca na situação abaixo)
    const category = await this.repository.findOne({ name });
    return category;
  }
};

export { CategoriesRepository };