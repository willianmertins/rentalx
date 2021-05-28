import { ICreateCategoryDTO } from "../dtos/ICreateUserDTO";


interface IUsersRepository  {

  create(data: ICreateCategoryDTO): Promise<void>;

}

export { IUsersRepository }