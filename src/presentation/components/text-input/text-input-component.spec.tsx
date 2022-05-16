import { mockRender } from '@/presentation/tests';
import {
  TextInputComponent,
  TextInputComponentProps,
} from './text-input-component';
import faker from '@faker-js/faker';
import { fireEvent, RenderAPI, waitFor } from '@testing-library/react-native';
import 'jest-styled-components/native';

type SutTypes = {
  sut: RenderAPI;
};
interface MakeSutProps extends Partial<TextInputComponentProps> {}

const makeSut = ({
  label = 'anyLabel',
  placeholderText = 'anyPlaceholder',
  iconName = 'mail',
  value = '',
  type,
  onChangeText = () => null,
}: MakeSutProps): SutTypes => {
  const sut = mockRender(
    <TextInputComponent
      label={label}
      type={type}
      placeholderText={placeholderText}
      iconName={iconName}
      value={value}
      onChangeText={onChangeText}
    />
  );
  return {
    sut,
  };
};

describe('TextInputComponent', () => {
  test('Should match with a snapshot', () => {
    const { sut } = makeSut({});
    const { toJSON } = sut;
    expect(toJSON()).toMatchSnapshot();
  });
  test('Should display text label', () => {
    const anyText = faker.datatype.string();
    const { sut } = makeSut({ label: anyText });
    const { getByTestId } = sut;
    const label = getByTestId('label');
    expect(label.children).toContain(anyText);
  });
  test('Should display text placeholder', () => {
    const anyText = faker.datatype.string();
    const { sut } = makeSut({ placeholderText: anyText });
    const { getByPlaceholderText } = sut;
    const input = getByPlaceholderText(anyText);
    expect(input).toBeTruthy();
  });
  test('Should contain the initial value', () => {
    const anyText = faker.datatype.string();
    const { sut } = makeSut({
      value: anyText,
    });
    const { getByDisplayValue } = sut;
    const input = getByDisplayValue(anyText);
    expect(input).toBeTruthy();
  });
  test('Should trigger the change text event', async () => {
    const handleChangeText = jest.fn();
    const anyText = faker.datatype.string();
    const { sut } = makeSut({
      onChangeText: handleChangeText,
    });
    const { getByTestId } = sut;
    const input = getByTestId('input');
    await fireEvent.changeText(input, anyText);
    expect(handleChangeText).toHaveBeenCalledWith(anyText);
  });
  test('Should find icon path by name', () => {
    const { sut } = makeSut({
      iconName: 'lock',
    });
    const { getByTestId } = sut;
    const genericIcon = getByTestId('genericIcon');
    expect(genericIcon.props.source).toEqual(1);
  });
  test('Should change password field visibility', async () => {
    const { sut } = makeSut({
      type: 'password',
    });
    const { getByTestId } = sut;
    const input = getByTestId('input');
    const visibilityPasswordButton = getByTestId('visibilityPasswordButton');
    expect(input.props.secureTextEntry).toBeTruthy();
    await waitFor(() => fireEvent.press(visibilityPasswordButton));
    expect(input.props.secureTextEntry).toBeFalsy();
  });
});
