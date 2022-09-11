export type RequestPagination = {
  pagination?: {
    page?: number;
    size?: number;
  };
};

export type RequestImage = {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
};
