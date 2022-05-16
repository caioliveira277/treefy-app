import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const Ilustation = styled.Image`
  width: 100%;
  height: 362px;
`;

export const Content = styled.View`
  padding: 0 20px;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  text-align: center;
`;

export const Paragraph = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  text-align: center;
`;

export const spacing = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 40,
  },
});
