import { CategoryModel } from './category-model';

export type ArticleModel = {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  banner: string;
  publishedAt: Date;
  categories: Pick<CategoryModel, 'id' | 'title'>[];
  author: {
    name: string;
  };
};
