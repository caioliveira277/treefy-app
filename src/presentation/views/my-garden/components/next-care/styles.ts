import { MyGardenCardType } from '@/presentation/@types/generics';
import { ThemeColors } from '@/presentation/themes/theme';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-bottom: 10px;
  padding: 0px 20px;
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 10px;
  padding: 0px 20px;
`;

export const TextBold = styled(Description)`
  font-family: ${({ theme }) => theme.fonts.families.bold};
`;

export const ConfirmTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
`;

export const ConfirmDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 30px;
`;

export const Icon = styled.Image<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const ConteinerItemText = styled.View`
  flex: 1;
`;

export const ContainerItemTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const ItemTitle = styled.Text<{ type: MyGardenCardType }>`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme, type }) =>
    type === 'incompleted' ? theme.colors.placeholder : theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-left: 5px;
`;

export const ItemSubtitle = styled.Text<{ type: MyGardenCardType }>`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme, type }) =>
    type === 'incompleted' ? theme.colors.placeholder : theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  margin-bottom: 3px;
`;

export const ItemDescription = styled.Text<{ type: MyGardenCardType }>`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme, type }) =>
    type === 'incompleted' ? theme.colors.placeholder : theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.regular};
`;

export const ItemImage = styled.Image<{ type: MyGardenCardType }>`
  width: 49px;
  height: 49px;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  opacity: ${({ type }) => (type === 'incompleted' ? 0.6 : 1)};
`;

export const ContainerHiddenItem = styled.View`
  background-color: #f5f5f5;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  min-height: 85px;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 20px;
  overflow: hidden;
`;

export const ContainerContent = styled.TouchableHighlight`
  background-color: ${({ theme }) => theme.colors.contrast};
  margin: 10px 20px;
  min-height: 85px;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const DeleteMask = styled.View`
  background: ${({ theme }) => theme.colors.error};
  flex: 1;
`;

export const ContainerHiddenContent = styled.View<{
  action: 'edit' | 'complete' | 'start';
  type?: MyGardenCardType;
}>`
  background-color: ${({ action, theme, type }) =>
    theme.colors[action as keyof ThemeColors] ||
    theme.colors[type as keyof ThemeColors] ||
    theme.colors.placeholder};
  justify-content: center;
  align-items: ${({ action }) =>
    action === 'edit' ? 'flex-start' : 'flex-end'};
  padding: 0px 30px;
  flex: 1;
`;

export const ContainerItem = styled.View<{
  type: MyGardenCardType;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  height: 85px;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  border-color: ${({ type, theme }) =>
    type === 'sun'
      ? theme.colors.sun
      : type === 'water'
      ? theme.colors.water
      : theme.colors.placeholder};
  border-width: 1.5px;
  border-style: dashed;
`;

export const styles = StyleSheet.create({
  empty: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  motiView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  withPaddingX: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  confirmButton: {
    marginTop: 30,
    marginBottom: 40,
  },
});
