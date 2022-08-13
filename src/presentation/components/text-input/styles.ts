import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-bottom: 10px;
`;

export const ContainerInput = styled.View<{ hasError: boolean }>`
  width: 100%;
  align-items: center;
  flex-direction: row;
  border: 1.5px solid;
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  border-color: ${({ theme, hasError }) =>
    hasError ? theme.colors.danger : theme.colors.placeholder_light};
  background: ${({ theme }) => theme.colors.white};
  min-height: 45px;
  position: relative;
`;

export const GenericIcon = styled.Image<{ iconSize: number }>`
  width: ${({ iconSize }) => `${iconSize}px`};
  position: absolute;
  left: 10px;
`;

export const PasswordIcon = styled.Image<{ iconSize: number }>`
  width: ${({ iconSize }) => `${iconSize}px`};
`;

export const VisibilityPasswordButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  width: 50px;
  height: 45px;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  padding-left: 38px;
  padding-right: 42px;
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const TextError = styled.Text`
  margin-top: 3px;
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
`;

export const textareaStyles = StyleSheet.create({
  input: {
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  icon: {
    top: 5,
  },
  container: {
    alignItems: undefined,
  },
});
