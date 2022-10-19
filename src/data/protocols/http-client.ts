export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
  params?: { [key: string]: any };
};

export interface HttpClient {
  request: <R = any>(data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export enum HttpStatusCode {
  ok = 200,
  // noContent = 204,
  // badRequest = 400,
  // unauthorized = 401,
  // forbidden = 403,
  // notFound = 404,
  // serverError = 500,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
