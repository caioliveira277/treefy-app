import { HttpPostClient } from '../../protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';

describe('Should call HttpPostClient with correct URL', () => {
  test('RemoteAuthentication', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = 'any_url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
