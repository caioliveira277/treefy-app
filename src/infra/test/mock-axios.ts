import axios from 'axios';
import faker from '@faker-js/faker';

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockClear().mockResolvedValue({
    data: faker.helpers.objectValue({ any: 'object' }),
    status: faker.datatype.number(),
  });
  return mockedAxios;
};
