import app from '../src/app';
import { prisma } from '../src/database';
import supertest from 'supertest';
import { itemFactory, itemFactoryFaker } from './factories/itemFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "items"`;
});

describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
    const item = await itemFactoryFaker();
    const result = await supertest(app).post("/items").send(item);
    expect(result.status).toEqual(201);
  });

  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () => {
    const item = await itemFactory();
    await supertest(app).post("/items").send(item);
    const result = await supertest(app).post("/items").send(item);
    expect(result.status).toEqual(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async () => {
    const item = await itemFactoryFaker();
    await supertest(app).post("/items").send(item);
    const result = await supertest(app).get("/items").send();
    expect(typeof (result.body) && result.status).toBe('array' && 200);
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async () => {
    const item = await itemFactoryFaker();
    await supertest(app).post("/items").send(item);
    const result = await supertest(app).get("/items").send();
    expect(result.body[0]).toMatchObject(item)
  });
  it.todo('Deve retornar status 404 caso não exista um item com esse id');
});

afterAll(async () => {
  await prisma.$disconnect();
});