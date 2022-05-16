import axios from 'axios';
import { AxiosHttpClientAdapter } from './axios-http-client';
import { mockAxios } from '@/infra/tests';
import { mockPostRequest } from '@/data/tests';

jest.mock('axios');
type SutTypes = {
  sut: AxiosHttpClientAdapter;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClientAdapter();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClientAdapter', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    const axiosResponse = await mockedAxios.post.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });
});
