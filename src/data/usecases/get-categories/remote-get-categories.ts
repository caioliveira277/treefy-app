import { AllCategoryParams, GetCategories } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { CategoryModel } from '@/domain/models';

type CategoryModelRequest = {
  data: {
    id: number;
    attributes: {
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      title: string;
      image: {
        data: {
          id: number;
          attributes: {
            url: string;
          };
        };
      };
    };
  }[];
};

export class RemoteGetCategories implements GetCategories {
  private readonly httpClient: HttpClient;

  private readonly url = `${process.env.API_BASE_URL}/api/categories`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatUrlImage(imageUrl: string) {
    return `${process.env.API_BASE_URL}${imageUrl}`;
  }

  public async all(params: AllCategoryParams): Promise<CategoryModel[]> {
    const response = await this.httpClient.request<CategoryModelRequest>({
      method: 'GET',
      url: this.url,
      params: {
        'pagination[page]': params?.pagination?.page || 1,
        'pagination[pageSize]': params?.pagination?.size || 10,
        'populate[image][fields][0]': 'url',
      },
    });
    if (
      response.statusCode === HttpStatusCode.ok &&
      response?.body?.data?.length
    ) {
      return response.body.data.map((category) => ({
        id: category.id,
        createdAt: new Date(category.attributes.createdAt),
        updatedAt: new Date(category.attributes.updatedAt),
        title: category.attributes.title,
        image: this.formatUrlImage(
          category.attributes.image.data.attributes.url
        ),
      }));
    }
    return [];
  }
}
