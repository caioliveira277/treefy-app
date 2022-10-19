import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { currentTheme } from '@/presentation/themes';

export const Container = styled.View<{ hasError: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  border: ${({ theme, hasError }) =>
    `1.5px solid ${
      hasError ? theme.colors.error : theme.colors.placeholder_light
    }`};
  justify-content: center;
  overflow: hidden;
  padding-left: 15px;
  flex: 1;
  height: 45px;
`;

export const styles = StyleSheet.create({
  pickerItem: {
    fontFamily: currentTheme.fonts.families.regular,
    fontSize: 14,
    height: 45,
  },
});
