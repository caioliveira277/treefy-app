import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Legend = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 10px;
`;

export const spacing = StyleSheet.create({
  input: {
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 30,
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
  },
});
