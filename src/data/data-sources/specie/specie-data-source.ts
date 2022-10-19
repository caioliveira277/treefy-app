import { SpecieModel } from '@/domain/models';
import { BaseDataSource } from '@/data/data-sources/base-data-source';
import { SpeciesRequest } from '@/@types/request';
import { RangeTimes } from '@/@types/enums';

export class SpecieDataSource implements BaseDataSource {
  public data: SpeciesRequest['data'];

  private readonly baseUrl =
    process.env.NODE_ENV === 'dev' ? process.env.API_BASE_URL : '';

  constructor(data: SpeciesRequest['data']) {
    this.data = data;
  }

  public toModel(): SpecieModel[] {
    return this.data.map((specie) => ({
      id: specie.id,
      description: specie.attributes.description,
      name: specie.attributes.name,
      image: `${this.baseUrl}${specie.attributes.image.data.attributes.url}`,
      sunTimes: specie.attributes.sunTimes,
      sunRange: specie.attributes.sunRange as RangeTimes,
      waterTimes: specie.attributes.waterTimes,
      waterRange: specie.attributes.waterRange as RangeTimes,
    }));
  }
}
