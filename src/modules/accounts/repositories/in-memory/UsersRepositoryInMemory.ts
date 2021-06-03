import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";



class UsersRepositoryInMemory implements IUsersRepository {

  users: User[] = [];

  async create({ driver_license,email,name,password }): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password
    });

    this.users.push(user);

  }

  async findByEmail(email: string): Promise<User> {
     return this.users.find(u => u.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(u => u.id === id);
  }
  
}

export { UsersRepositoryInMemory }