

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be albe to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Carro teste",
      daily_rate: 220,
      license_plate: "DEF-123123",
      fine_amount: 60,
      brand: "BMW",
      category_id: "5324782e-9946-4595-bd94-f3d4fbfc9557"
    });

    const cars = await listCarsUseCase.execute({});
    
    expect(cars).toEqual([car]);
  });

  it("should be albe to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Carro teste",
      daily_rate: 320,
      license_plate: "DEF-123123",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "category_id"
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    });
    
    expect(cars).toEqual([car]);
  });

  it("should be albe to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_3",
      description: "Carro teste",
      daily_rate: 320,
      license_plate: "DEF-1254",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "category_id"
    });

    const cars = await listCarsUseCase.execute({
      name: "Car_3"
    });

    expect(cars).toEqual([car]);
  });

  it("should be albe to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_4",
      description: "Carro teste",
      daily_rate: 320,
      license_plate: "DEF-1254",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "12345"
    });

    const cars = await listCarsUseCase.execute({
      category_id: "12345"
    });

    expect(cars).toEqual([car]);
  });

});