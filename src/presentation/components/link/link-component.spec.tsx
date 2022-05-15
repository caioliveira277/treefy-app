import { mockRender } from '@/presentation/test';
import { LinkComponent, LinkComponentProps } from './link-component';
import faker from '@faker-js/faker';
import { fireEvent, RenderAPI } from '@testing-library/react-native';
import { currentTheme } from '@/presentation/themes';
import 'jest-styled-components/native';

type SutTypes = {
  sut: RenderAPI;
};
interface MakeSutProps extends Partial<LinkComponentProps> {}

const makeSut = ({ children = 'anyText', onPress }: MakeSutProps): SutTypes => {
  const sut = mockRender(
    <LinkComponent onPress={onPress}>{children}</LinkComponent>
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
  test('Should display the text passed by children', () => {
    const anyText = faker.datatype.string();
    const { sut } = makeSut({
      children: anyText,
    });
    const { getByTestId } = sut;
    const text = getByTestId('text');
    expect(text.children).toContain(anyText);
  });
  test('Should trigger the press event', async () => {
    const handlePress = jest.fn();
    const { sut } = makeSut({
      onPress: handlePress,
    });
    const { getByTestId } = sut;
    const link = getByTestId('link');
    fireEvent.press(link);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
  test('Should apply the primary color in the text', () => {
    const { sut } = makeSut({});
    const { getByTestId } = sut;
    const text = getByTestId('text');

    expect(text).toHaveStyleRule('color', currentTheme.colors.primary);
  });
});
