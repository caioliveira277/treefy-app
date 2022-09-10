import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols';

import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request(params: HttpRequest): Promise<HttpResponse> {
    try {
      const req = await axios.request({
        url: params.url,
        method: params.method,
        data: params.body,
        headers: params.headers,
        params: params.params,
      });
      return {
        statusCode: req.status,
        body: req.data,
      };
    } catch (error) {
      const axiosError = error as AxiosResponse;
      // eslint-disable-next-line no-console
      console.log('axios request error', { ...axiosError });
      return {
        statusCode: axiosError.status,
        body: axiosError.data,
      };
    }
  }
}
