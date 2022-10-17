import { RangeTimes } from './enums';

export type MetaRequest = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type PaginationRequest = {
  pagination?: {
    page?: number;
    size?: number;
  };
};

export type ImageRequest = {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
  meta: MetaRequest;
};

type CategoriesRequest = {
  data: {
    id: number;
    attributes: {
      title: string;
      image: ImageRequest;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  meta: MetaRequest;
};

export type ArticleRequest = {
  data: {
    id: number;
    attributes: {
      title: string;
      description: string;
      content?: string;
      banner: ImageRequest;
      thumbnail: ImageRequest;
      publishedAt: Date;
      categories: CategoriesRequest;
      updatedBy: {
        data: {
          attributes: {
            firstname: string;
            lastname: string;
            createdAt: Date;
          };
        };
      };
    };
    feedbacks: {
      averageRatings: number | null;
    };
  };
  meta: MetaRequest;
};

export type ArticlesRequest = {
  data: ArticleRequest['data'][];
  meta: MetaRequest;
};

export type FeedbackRequest = {
  data: {
    id: number;
    attributes: {
      ratingPoints: number;
    };
  };
  meta: MetaRequest;
};

export type FeedbacksRequest = {
  data: FeedbackRequest['data'][];
  meta: MetaRequest;
};

export type ViewedArticleRequest = {
  data: {
    id: number;
  };
  meta: MetaRequest;
};

export type ViewedArticlesRequest = {
  data: ViewedArticleRequest['data'][];
  meta: MetaRequest;
};

export type SpecieRequest = {
  data: {
    id: number;
    attributes: {
      name: string;
      description: string;
      waterTimes: number;
      waterRange: keyof typeof RangeTimes;
      sunTimes: number;
      sunRange: keyof typeof RangeTimes;
    };
  };
  meta: MetaRequest;
};

export type SpeciesRequest = {
  data: SpecieRequest['data'][];
  meta: MetaRequest;
};

export type UserPlantRequest = {
  data: {
    id: number;
    attributes: {
      name: string;
      annotation: string;
      waterTimes: number;
      waterRange: keyof typeof RangeTimes;
      sunTimes: number;
      sunRange: keyof typeof RangeTimes;
      species: SpecieRequest;
      lastSunExposure: Date | null;
      lastWatering: Date | null;
    };
  };
  meta: MetaRequest;
};

export type UserPlantsRequest = {
  data: UserPlantRequest['data'][];
  meta: MetaRequest;
};
