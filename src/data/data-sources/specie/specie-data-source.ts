import { SpecieModel } from '@/domain/models';
import { BaseDataSource } from '@/data/data-sources/base-data-source';
import { SpeciesRequest } from '@/@types/request';
import { RangeTimes } from '@/@types/enums';

export class SpecieDataSource implements BaseDataSource {
  public data: SpeciesRequest['data'];

  constructor(data: SpeciesRequest['data']) {
    this.data = data;
  }

  public toModel(): SpecieModel[] {
    return this.data.map((specie) => ({
      id: specie.id,
      description: specie.attributes.description,
      name: specie.attributes.name,
      sunTimes: specie.attributes.sunTimes,
      sunRange: RangeTimes[specie.attributes.sunRange],
      waterTimes: specie.attributes.waterTimes,
      waterRange: RangeTimes[specie.attributes.waterRange],
    }));
  }
}
