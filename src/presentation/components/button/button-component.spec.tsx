import { mockRender } from '@/presentation/test';
import { ButtonComponent, ButtonComponentProps } from './button-component';
import faker from '@faker-js/faker';
import { fireEvent, RenderAPI } from '@testing-library/react-native';
import { currentTheme } from '@/presentation/themes';
import 'jest-styled-components/native';

type SutTypes = {
  sut: RenderAPI;
};
interface MakeSutProps extends Partial<ButtonComponentProps> {}

const makeSut = ({
  children = 'anyText',
  onPress,
  type,
}: MakeSutProps): SutTypes => {
  const sut = mockRender(
    <ButtonComponent type={type} onPress={onPress}>
      {children}
    </ButtonComponent>
  );
  return {
    sut,
  };
};

describe('ButtonComponent', () => {
  test('Should match with a snapshot', () => {
    const { sut } = makeSut({});
    const { toJSON } = sut;
    expect(toJSON()).toMatchSnapshot();
  });
  test('Should trigger the press event', () => {
    const handlePress = jest.fn();
    const { sut } = makeSut({
      onPress: handlePress,
    });
    const { getByTestId } = sut;
    const button = getByTestId('button');
    fireEvent.press(button);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
  test('Should change the style according to its type', () => {
    const { sut } = makeSut({
      type: 'outline',
    });
    const { getByTestId } = sut;
    const button = getByTestId('button');
    const text = getByTestId('text');

    expect(button).toHaveStyleRule(
      'background-color',
      currentTheme.colors.white
    );
    expect(text).toHaveStyleRule('color', currentTheme.colors.body);
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
});
