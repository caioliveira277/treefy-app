import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Separator = styled.View`
  width: 100%;
  height: 0.5px;
  background: ${({ theme }) => theme.colors.placeholder_light};
  align-self: center;
  margin: 40px 0px 30px;
`;

export const spacing = StyleSheet.create({
  nav: {
    marginBottom: 40,
  },
  button: {
    marginBottom: 40,
  },
});
