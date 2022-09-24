import { ArticleModel } from '@/domain/models';
import { BaseViewModel } from '../base-view-model';

export interface ArticleViewModel extends BaseViewModel {
  article: ArticleModel;

  handleGetArticle(): Promise<void>;
}
