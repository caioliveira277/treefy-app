import { UserPlantModel } from '@/domain/models';
import { BaseDataSource } from '@/data/data-sources/base-data-source';
import { UserPlantsRequest } from '@/@types/request';
import { RangeTimes } from '@/@types/enums';
import { isValid } from 'date-fns';
import { SpecieDataSource } from '../specie/specie-data-source';

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
      specie: plant.attributes.species.data
        ? new SpecieDataSource([plant.attributes.species.data]).toModel()[0]
        : null,
      sunTimes: plant.attributes.sunTimes,
      sunRange: (plant.attributes.sunRange as RangeTimes) || null,
      waterTimes: plant.attributes.waterTimes,
      waterRange: (plant.attributes.waterRange as RangeTimes) || null,
      lastWatering: isValid(new Date(plant.attributes.lastWatering || ''))
        ? new Date(plant.attributes.lastWatering || '')
        : null,
      lastSunExposure: isValid(new Date(plant.attributes.lastSunExposure || ''))
        ? new Date(plant.attributes.lastSunExposure || '')
        : null,
    }));
  }
}
