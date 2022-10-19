import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { currentTheme } from '@/presentation/themes';
import { Label } from '@/presentation/components/text-input/styles';

export const Container = styled.View`
  padding: 40px 20px;
`;

export const PeriodSectionContainer = styled.View`
  margin-bottom: 30px;
`;

export const PeriodContainer = styled.View`
  flex-direction: row;
  align-items: center;
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

export const SelectContainer = styled.View`
  margin-bottom: 30px;
`;

export const SelectButton = styled.TouchableOpacity`
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  border: 1px dashed ${({ theme }) => theme.colors.placeholder};
  padding: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const SelectButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-family: ${({ theme }) => theme.fonts.families.medium};
`;

// specie
export const ContainerItem = styled.TouchableOpacity<{
  withBorder?: boolean;
  noMargin?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.contrast};
  min-height: 68px;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  padding: 10px;
  flex-direction: row;
  align-items: center;
  margin: ${({ noMargin }) => (noMargin ? '0' : '0 20px 10px')};
  border: ${({ theme, withBorder }) =>
    withBorder ? `1px dashed ${theme.colors.placeholder}` : 'none'};
`;

export const ContainerContent = styled.View`
  flex: 1;
`;

export const ItemTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-bottom: 5px;
`;

export const ItemDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.regular};
`;

export const ItemImage = styled.Image`
  width: 49px;
  height: 49px;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
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
  search: {
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
  buttonRemoveSelection: {
    marginTop: 30,
  },
  noPaddingX: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  noPaddingY: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  empty: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
