import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
`;

export const ContainerPadding = styled.View`
  padding: 0 20px;
`;

export const spacing = StyleSheet.create({
  salutation: {
    marginTop: 40,
    marginBottom: 30,
  },
  searchInput: {
    marginBottom: 30,
  },
  carrousel: {
    marginBottom: 30,
  },
  informativeContents: {
    marginBottom: 20,
  },
});
