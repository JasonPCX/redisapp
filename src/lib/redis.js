import { Repository } from "redis-om";

const { Entity, Schema, Client } = require("redis-om");

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Car extends Entity {}

let carSchema = new Schema(
  Car,
  {
    make: { type: "string" },
    model: { type: "string" },
    image: { type: "string" },
    description: { type: "text", textSearch: true },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createCar(data) {
  await connect();

  const repository = client.fetchRepository(carSchema);

  const car = repository.createEntity(data);

  const id = await repository.save(car);

  return id;
}

export async function createIndex() {
  await connect();

  const carRepository = new Repository(carSchema, client);

  await carRepository.createIndex();
}

export async function searchCars(q) {
  await connect();

  const carRepository = new Repository(carSchema, client);

  const cars = await carRepository
    .search()
    .where("make")
    .eq(q)
    .or("model")
    .eq(q)
    .or("description")
    .matches(q)
    .return.all();

  return cars;
}
