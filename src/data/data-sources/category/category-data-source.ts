import { CategoryModel } from '@/domain/models';
import { BaseDataSource } from '@/data/data-sources/base-data-source';
import { CategoriesRequest } from '@/@types/request';

export class CategoryDataSource implements BaseDataSource {
  public data: CategoriesRequest['data'];

  private readonly baseUrl =
    process.env.NODE_ENV !== 'production' ? process.env.API_BASE_URL : '';

  constructor(data: CategoriesRequest['data']) {
    this.data = data;
  }

  public toModel(): CategoryModel[] {
    return this.data.map((category) => ({
      id: category.id,
      createdAt: new Date(category.attributes.createdAt),
      updatedAt: new Date(category.attributes.updatedAt),
      title: category.attributes.title,
      image: `${this.baseUrl}${category.attributes.image.data.attributes.url}`,
    }));
  }
}
