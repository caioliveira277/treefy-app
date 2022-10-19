import styled, { DefaultTheme } from 'styled-components/native';
import * as InputComponents from '@/presentation/components/text-input/styles';

export const Container = styled.View``;

export const Label = styled.Text<{
  titleFontSize: keyof DefaultTheme['fonts']['sizes'];
}>`
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme, titleFontSize }) => theme.fonts.sizes[titleFontSize]};
  margin-bottom: 10px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const Input = styled(InputComponents.Input)`
  height: 45px;
  padding-left: 15px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 45px;
  position: absolute;
  right: 0;
  border-left-width: 1px;
  border-left-color: ${({ theme }) => theme.colors.placeholder_light};
`;

export const Icon = styled.Image`
  width: 16px;
  height: 16px;
`;

export const InformativeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.body};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
`;
