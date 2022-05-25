import styled from 'styled-components/native';

export const Separator = styled.View`
  width: 100%;
  height: 0.5px;
  background: ${({ theme }) => theme.colors.placeholder};
  align-self: center;
  margin: 40px 0px;
`;
