import { faker } from '@faker-js/faker';

export async function itemFactoryFaker() {
  return {
    title: faker.lorem.words(3),
    url: faker.internet.url(),
    description: faker.lorem.paragraph(1),
    amount: Number(faker.random.numeric())
  }
};

export async function itemFactory() {
  return {
    title: 'Computador gamer',
    url: 'https://www.youtube.com/',
    description: 'Computador gamer dos sonhos *-*',
    amount: 1
  }
}