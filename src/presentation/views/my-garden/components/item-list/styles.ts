import styled from 'styled-components/native';

export const ConteinerItemText = styled.View`
  margin-left: 8px;
`;

export const ContainerItemTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
`;

export const ItemSmallText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
`;

export const ItemTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
`;

export const ItemDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
`;

export const ItemImage = styled.Image<{ imageSize: string }>`
  width: ${({ imageSize }) => imageSize};
  height: ${({ imageSize }) => imageSize};
  border-radius: 76px;
`;

export const ContainerItem = styled.View<{
  type: 'sun' | 'water';
  borderDashed: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  padding: 10px;
  border-color: ${({ type }) => (type === 'sun' ? '#F6F8E3' : '#ebf6ff')};
  border-width: 1.5px;
  border-style: ${({ borderDashed }) => (borderDashed ? 'dashed' : 'solid')};
  margin-bottom: 10px;
`;
