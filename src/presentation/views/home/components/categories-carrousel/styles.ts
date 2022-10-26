import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import * as HomeStyles from '../../styles';

export const Container = styled.View`
  margin-bottom: 10px;
`;

export const Corrousel = styled.ScrollView`
  padding-bottom: 10px;
`;

export const ItemContainer = styled.View<{ active: boolean }>`
  align-items: center;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
`;

export const Title = styled(HomeStyles.Title)`
  margin: 0 10px 4px 20px;
`;

export const ContainerShadow = styled.TouchableOpacity`
  margin-bottom: 5px;
  overflow: hidden;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin-top: 5px;
`;

export const ItemImage = styled.Image`
  width: 75px;
  height: 75px;
  background: #fff;
`;

export const ItemText = styled.Text<{ active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.placeholder};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  margin-bottom: 5px;
`;

export const ActivePoint = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 5px;
`;

export const Icon = styled.Image`
  width: 10px;
  height: 5px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const customStyle = StyleSheet.create({
  item: {
    marginLeft: 20,
  },
  lastItem: {
    marginLeft: 20,
    marginRight: 20,
  },
});
