import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const spacing = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  nextCare: {
    marginBottom: 30,
  },
});
