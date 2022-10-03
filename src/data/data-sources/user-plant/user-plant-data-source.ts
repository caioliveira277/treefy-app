import { UserPlantModel } from '@/domain/models';
import { BaseDataSource } from '@/data/data-sources/base-data-source';
import { UserPlantsRequest } from '@/@types/request';
import { RangeTimes } from '@/@types/enums';

export class UserPlantDataSource implements BaseDataSource {
  public data: UserPlantsRequest['data'];

  constructor(data: UserPlantsRequest['data']) {
    this.data = data;
  }

  public toModel(): UserPlantModel[] {
    return this.data.map((plant) => ({
      id: plant.id,
      annotation: plant.attributes.annotation,
      name: plant.attributes.name,
      specieId: plant.attributes.species.data?.id || null,
      sunTimes: plant.attributes.sunTimes,
      sunRange: RangeTimes[plant.attributes.sunRange] || null,
      waterTimes: plant.attributes.waterTimes,
      waterRange: RangeTimes[plant.attributes.waterRange] || null,
    }));
  }
}
