import { mockRender } from '@/presentation/tests';
import {
  PageLoadingComponent,
  PageLoadingComponentProps,
} from './page-loading-component';
import { RenderAPI } from '@testing-library/react-native';

type SutTypes = {
  sut: RenderAPI;
};
interface MakeSutProps extends Partial<PageLoadingComponentProps> {}

const makeSut = ({}: MakeSutProps): SutTypes => {
  const sut = mockRender(<PageLoadingComponent />);
  return {
    sut,
  };
};

describe('PageLoadingComponent', () => {
  test('Should match with a snapshot', () => {
    const { sut } = makeSut({});
    const { toJSON } = sut;
    expect(toJSON()).toMatchSnapshot();
  });
});
