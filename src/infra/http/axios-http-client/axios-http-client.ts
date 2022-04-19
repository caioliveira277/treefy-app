import { HttpPostClient, HttpPostParams } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClientAdapter implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<any> {
    const httpRepsonse = await axios.post(params.url, params.body);
    return {
      statusCode: httpRepsonse.status,
      body: httpRepsonse.data,
    };
  }
}
