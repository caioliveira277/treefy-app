import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const ContainerTitleIcon = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-right: 8px;
`;

export const Icon = styled.Image`
  width: 18px;
  height: 18px;
`;

export const spacing = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
});
