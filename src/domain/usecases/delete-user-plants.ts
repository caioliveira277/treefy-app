export type DeleteUserPlantsDeleteParams = {
  id: number;
  accessToken: string;
};

export interface DeleteUserPlants {
  delete(params: DeleteUserPlantsDeleteParams): Promise<boolean>;
}
