import { UserPlantModel } from '@/domain/models';

export enum ModalState {
  close = 0,
  open = 1,
}

export type MyGardenCardType = 'sun' | 'water' | 'incompleted';

export interface MyGardenItem extends UserPlantModel {
  type: MyGardenCardType;
  key: string | number;
}
