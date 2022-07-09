import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { currentTheme } from '@/presentation/themes';
import { Label } from '@/presentation/components/text-input/styles';

export const Container = styled.View`
  padding: 40px 20px;
`;

export const PeriodContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  text-align: center;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 30px;
`;

export const TextRed = styled(Description)`
  color: red;
`;

export const CustomLabel = styled(Label)``;

export const CustomLabelSmall = styled(Label)`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  margin: 0;
`;

export const bottomSheetStyles = StyleSheet.create({
  bottomSheetScrollView: {
    backgroundColor: currentTheme.colors.contrast,
  },
  indicator: {
    backgroundColor: currentTheme.colors.primary,
    width: 40,
  },
});

export const styles = StyleSheet.create({
  input: {
    marginBottom: 25,
  },
  inputPeriodNumberContainer: {
    width: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  inputPeriodNumber: {
    paddingRight: 0,
  },
  button: {
    marginTop: 10,
  },
});
