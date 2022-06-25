import styled from 'styled-components/native';
import { Title } from '@/presentation/views/my-garden/styles';

export const Container = styled.View`
  padding: 0px 20px;
`;

export const TitleNextCare = styled(Title)`
  margin-bottom: 20px;
`;

export const Content = styled.View``;

export const ContainerItem = styled.View<{ type: 'sun' | 'water' }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  padding: 8px 10px;
  border-color: ${({ type }) => (type === 'sun' ? '#F6F8E3' : '#ebf6ff')};
  border-width: 1.5px;
  border-style: solid;
  margin-bottom: 10px;
`;

export const ConteinerText = styled.View`
  margin-left: 8px;
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

export const ItemDescriptionBold = styled(ItemDescription)`
  font-family: ${({ theme }) => theme.fonts.families.bold};
`;
