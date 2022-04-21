import { mockRender } from '@/presentation/test';
import { TextInputComponent } from './text-input-component';
import faker from '@faker-js/faker';
import { fireEvent, RenderAPI } from '@testing-library/react-native';
import { IconName } from '@/presentation/utils';
import 'jest-styled-components/native';

type SutTypes = {
  sut: RenderAPI;
};
type MakeSutProps = {
  label?: string;
  placeholderText?: string;
  iconName?: IconName;
  initialValue?: string;
  onChangeText?: () => void;
};

const makeSut = ({
  label = 'anyLabel',
  placeholderText = 'anyPlaceholder',
  iconName = 'mail',
  initialValue = '',
  onChangeText = () => null,
}: MakeSutProps): SutTypes => {
  const sut = mockRender(
    <TextInputComponent
      label={label}
      placeholderText={placeholderText}
      iconName={iconName}
      initialValue={initialValue}
      onChangeText={onChangeText}
    />
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
      initialValue: anyText,
    });
    const { getByDisplayValue } = sut;
    const input = getByDisplayValue(anyText);
    expect(input).toBeTruthy();
  });
  test('Should trigger the change text event', () => {
    const handleChangeText = jest.fn();
    const anyText = faker.datatype.string();
    const { sut } = makeSut({
      onChangeText: handleChangeText,
    });
    const { getByTestId } = sut;
    const input = getByTestId('input');
    fireEvent.changeText(input, anyText);
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
});
