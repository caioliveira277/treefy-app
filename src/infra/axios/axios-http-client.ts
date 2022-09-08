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
      const { status, data: dataError } = error as AxiosResponse;
      return {
        statusCode: status,
        body: dataError,
      };
    }
  }
}
