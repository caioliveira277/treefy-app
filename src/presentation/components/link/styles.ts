import styled from 'styled-components/native';

export const Container = styled.View``;
export const Link = styled.TouchableOpacity``;

export const Text = styled.Text<{ fontSize?: string; color?: string }>`
  font-size: ${({ fontSize, theme }) => fontSize || theme.fonts.sizes.md};
  color: ${({ color, theme }) => color || theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  text-decoration: underline;
`;
