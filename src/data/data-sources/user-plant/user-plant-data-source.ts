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
      specie: plant.attributes.species.data?.id
        ? {
            id: plant.attributes.species.data?.id,
            description: plant.attributes.species.data.attributes.description,
            name: plant.attributes.species.data.attributes.name,
            sunRange:
              (plant.attributes.species.data.attributes
                .sunRange as RangeTimes) || null,
            sunTimes: plant.attributes.species.data.attributes.sunTimes,
            waterRange:
              (plant.attributes.species.data.attributes
                .waterRange as RangeTimes) || null,
            waterTimes: plant.attributes.species.data.attributes.waterTimes,
          }
        : null,
      sunTimes: plant.attributes.sunTimes,
      sunRange: (plant.attributes.sunRange as RangeTimes) || null,
      waterTimes: plant.attributes.waterTimes,
      waterRange: (plant.attributes.waterRange as RangeTimes) || null,
    }));
  }
}
