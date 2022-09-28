export type CreateViewedArticlesCreateParams = {
  accessToken: string;
  articleId: number;
};

export interface CreateViewedArticles {
  create(params: CreateViewedArticlesCreateParams): Promise<boolean>;
}
