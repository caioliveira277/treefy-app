import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View``;

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

export const ItemTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-left: 5px;
`;

export const ItemSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  margin-bottom: 3px;
`;

export const ItemDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.placeholder};
  font-family: ${({ theme }) => theme.fonts.families.regular};
`;

export const ItemImage = styled.Image`
  width: 49px;
  height: 49px;
  border-radius: 10px;
`;

export const ContainerHiddenItem = styled.View`
  background-color: #f5f5f5;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  height: 85px;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 20px;
  overflow: hidden;
`;

export const ContainerContent = styled.View`
  background-color: ${({ theme }) => theme.colors.contrast};
  margin: 10px 20px;
  height: 85px;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const ContainerHiddenContent = styled.View<{
  type: 'edit' | 'complete';
}>`
  background-color: ${({ type, theme }) =>
    type === 'edit' ? theme.colors.edit : theme.colors.complete};
  justify-content: center;
  align-items: ${({ type }) => (type === 'edit' ? 'flex-start' : 'flex-end')};
  padding: 0px 30px;
  flex: 1;
`;

export const ContainerItem = styled.View<{
  type: 'sun' | 'water';
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  height: 85px;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  border-color: ${({ type, theme }) =>
    type === 'sun' ? theme.colors.sun : theme.colors.water};
  border-width: 1.5px;
  border-style: dashed;
`;

export const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 190,
  },
});
