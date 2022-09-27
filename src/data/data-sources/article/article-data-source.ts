import { ArticleModel } from '@/domain/models';
import { BaseDataSource } from '@/data/data-sources/base-data-source';
import { ArticlesRequest } from '@/@types/request';

export class ArticleDataSource implements BaseDataSource {
  public data: ArticlesRequest['data'];

  private readonly baseUrl = process.env.API_BASE_URL;

  constructor(data: ArticlesRequest['data']) {
    this.data = data;
  }

  public toModel(): ArticleModel[] {
    return this.data.map((article) => ({
      id: article.id,
      title: article.attributes.title,
      description: article.attributes.description,
      content: article.attributes.content || '',
      categories: article.attributes.categories.data.map((category) => ({
        id: category.id,
        title: category.attributes.title,
      })),
      banner: `${this.baseUrl}${article.attributes.banner.data.attributes.url}`,
      thumbnail: `${this.baseUrl}${article.attributes.thumbnail.data.attributes.url}`,
      author: {
        name: `${article.attributes.updatedBy.data.attributes.firstname} ${article.attributes.updatedBy.data.attributes.lastname}`,
        createdAt: new Date(
          article.attributes.updatedBy.data.attributes.createdAt
        ),
      },
      averageRating: article.feedbacks.averageRatings,
      publishedAt: new Date(article.attributes.publishedAt),
    }));
  }
}
