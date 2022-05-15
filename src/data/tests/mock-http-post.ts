import { HttpPostParams } from '@/data/protocols/http';
import faker from '@faker-js/faker';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: { any: 'object' },
});
