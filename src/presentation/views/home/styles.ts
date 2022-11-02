import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
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
    marginBottom: 20,
  },
  searchInput: {
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
