import { ContentBlock } from '@/@types/content-block';
import { CategoryModel } from './category-model';

export type ArticleModel = {
  id: number;
  title: string;
  description: string;
  content: string | ContentBlock;
  thumbnail: string;
  banner: string;
  publishedAt: Date;
  categories: Pick<CategoryModel, 'id' | 'title'>[];
  author: {
    name: string;
    createdAt: Date;
  };
  averageRating: number | null;
};
