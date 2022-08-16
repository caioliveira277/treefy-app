import { mockRender } from '@/presentation/tests';
import { LegendComponent, LegendComponentProps } from './legend-component';
import { RenderAPI } from '@testing-library/react-native';

type SutTypes = {
  sut: RenderAPI;
};
interface MakeSutProps extends Partial<LegendComponentProps> {}

const makeSut = ({ children = 'Any content' }: MakeSutProps): SutTypes => {
  const sut = mockRender(<LegendComponent>{children}</LegendComponent>);
  return {
    sut,
  };
};

describe('LegendComponent', () => {
  test('Should match with a snapshot', () => {
    const { sut } = makeSut({});
    const { toJSON } = sut;
    expect(toJSON()).toMatchSnapshot();
  });
});
