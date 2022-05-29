import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-bottom: 10px;
`;

export const Paragraph = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
`;

export const spacing = StyleSheet.create({
  paragraph: {
    marginBottom: 30,
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
  },
});
