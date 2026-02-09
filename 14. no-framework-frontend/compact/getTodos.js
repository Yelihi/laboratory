const { faker } = window;

const createElement = () => ({
  text: faker.random.words(3),
  completed: faker.random.boolean(),
});

const repeat = (elementFactory, number) => {
  const array = [];
  for (let index = 0; index < number; index++) {
    array.push(elementFactory());
  }

  return array;
};

/**
 * mock data 생성용
 */
export default () => {
  const howMany = faker.random.number(10) + 1;
  return repeat(createElement, howMany);
};
