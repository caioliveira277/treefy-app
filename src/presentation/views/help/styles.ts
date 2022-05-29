import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
`;

export const Paragraph = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
`;

export const ContainerComunicationChannel = styled.View`
  margin-bottom: 20px;
`;

export const ContainerLabelIcon = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`;

export const Label = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
`;

export const spacing = StyleSheet.create({
  subTitle: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 20,
  },
  link: {
    marginBottom: 8,
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
  },
});
