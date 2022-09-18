export interface BaseDataSource {
  data: Record<string, any>;

  toModel(): Record<string, any> | [];
}
