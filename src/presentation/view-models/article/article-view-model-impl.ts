import { ArticleViewModel } from './article-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { GetArticles } from '@/domain/usecases';
import { ArticleModel } from '@/domain/models';

export class ArticleViewModelImpl
  extends BaseViewModelImpl
  implements ArticleViewModel
{
  public readonly getArticles: GetArticles;

  public article: ArticleModel;

  constructor(getArticles: GetArticles) {
    super();
    this.getArticles = getArticles;
    this.article = {} as ArticleModel;
  }

  public async handleGetArticle(): Promise<void> {
    const articleId = (
      this.baseView?.props.route.params as StackParamList['Article']
    ).articleId;

    const article = await this.getArticles.oneById({ articleId });
    this.article = article;

    this.notifyViewAboutChanges();
  }
}
