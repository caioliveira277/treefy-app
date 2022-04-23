import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  text-align: center;
`;

export const Ilustation = styled.Image`
  width: 100%;
  height: 362px;
`;

export const Content = styled(Container)`
  padding: 0 20px;
`;

export const spacing = StyleSheet.create({
  title: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 25,
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
  },
  link: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
});
