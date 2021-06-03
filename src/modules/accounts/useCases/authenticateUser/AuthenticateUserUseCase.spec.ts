import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/implementations/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticationUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticationUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authencitate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticationUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () =>{
    const user: ICreateUserDTO = {
      driver_license: "00123123",
      email: "teste@teste.com.br",
      password: "1234",
      name: "test"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ 
      email: user.email, 
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect( async () => {
      await authenticateUserUseCase.execute({
        email: "xongas@email.com",
        password: "123123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with authenticate incorrect password", () => {
    expect( async () => {
      const user: ICreateUserDTO = {
        driver_license: "123123",
        email: "test@test.com.br",
        password: "1234",
        name: "Teste"
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      });

    }).rejects.toBeInstanceOf(AppError);
  });

});