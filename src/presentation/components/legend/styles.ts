import styled from 'styled-components/native';

export const Legend = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 10px;
`;
