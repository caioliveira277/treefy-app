import { mockRender } from '@/presentation/tests';
import {
  SlideControlComponent,
  SlideControlProps,
} from './slide-control-component';
import faker from '@faker-js/faker';
import { fireEvent, RenderAPI } from '@testing-library/react-native';
import { currentTheme } from '@/presentation/themes';
import 'jest-styled-components/native';

type SutTypes = {
  sut: RenderAPI;
};
interface MakeSutProps extends Partial<SlideControlProps> {}

const makeSut = ({
  onPress,
  activeSlideIndex = 0,
  countOfItems = 3,
}: MakeSutProps): SutTypes => {
  const sut = mockRender(
    <SlideControlComponent
      onPress={onPress}
      activeSlideIndex={activeSlideIndex}
      countOfItems={countOfItems}
    />
  );
  return {
    sut,
  };
};

describe('LinkComponent', () => {
  test('Should match with a snapshot', () => {
    const { sut } = makeSut({});
    const { toJSON } = sut;
    expect(toJSON()).toMatchSnapshot();
  });
  test('Should display points by count of items', () => {
    const anyCountOfItems = faker.datatype.number({ min: 1, max: 8 });
    const { sut } = makeSut({
      countOfItems: anyCountOfItems,
    });
    const { getAllByTestId } = sut;
    const points = getAllByTestId('point');
    expect(points).toHaveLength(anyCountOfItems);
  });
  test('Should trigger the press event', async () => {
    const handlePress = jest.fn();
    const { sut } = makeSut({
      onPress: handlePress,
    });
    const { getAllByTestId } = sut;
    const point = getAllByTestId('point');
    await fireEvent.press(point[1]);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
  test('Should apply the primary color in active point', async () => {
    const { sut } = makeSut({
      activeSlideIndex: 1,
    });
    const { getAllByTestId } = sut;
    const point = getAllByTestId('point');

    expect(point[1]).toHaveStyleRule(
      'backgroundColor',
      currentTheme.colors.primary
    );
  });
});
