import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const IntroContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin-bottom: 40px;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 40px;
  align-self: center;
`;

export const Ilustation = styled.Image`
  width: 147px;
  height: 64px;
  align-self: center;
  top: 40px;
  position: absolute;
`;

export const IntroIlustation = styled.Image`
  width: 100%;
  height: 478px;
`;

export const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  button: {
    marginTop: 50,
  },
});
