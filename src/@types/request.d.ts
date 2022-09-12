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
};

type ArticlesRequest = {
  data: {
    id: number;
    attributes: {
      title: string;
      description: string;
      content?: string;
      banner: ImageRequest;
      thumbnail: ImageRequest;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      categories: CategoriesRequest;
    };
  }[];
};
