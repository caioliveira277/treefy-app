import styled from 'styled-components/native';

export const Container = styled.View``;
export const Link = styled.TouchableOpacity``;

export const Text = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  text-decoration: underline;
`;
