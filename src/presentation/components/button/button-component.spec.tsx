import { mockRender } from '@/presentation/test';
import { ButtonComponent, ButtonType } from './button-component';
import faker from '@faker-js/faker';
import { fireEvent, RenderAPI } from '@testing-library/react-native';
import { currentTheme } from '@/presentation/theme';
import 'jest-styled-components/native';

type SutTypes = {
  sut: RenderAPI;
};
type MakeSutProps = {
  text?: string;
  onPress?: () => void;
  type?: ButtonType;
};

const makeSut = ({
  text = 'anyText',
  onPress,
  type,
}: MakeSutProps): SutTypes => {
  const sut = mockRender(
    <ButtonComponent type={type} onPress={onPress}>
      {text}
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
  test('should change the style according to its type', () => {
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
  test('Should match with a snapshot', () => {
    const anyText = faker.datatype.string();
    const { sut } = makeSut({
      text: anyText,
    });
    const { getByTestId } = sut;
    const text = getByTestId('text');
    expect(text.children).toContain(anyText);
  });
});
