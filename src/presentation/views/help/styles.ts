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

export const ContainerTextIcon = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`;

export const Label = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
`;

export const Link = styled.TouchableOpacity`
  padding: 8px 0px;
`;

export const SmallText = styled(Paragraph)`
  text-decoration: underline;
`;

export const spacing = StyleSheet.create({
  subTitle: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 20,
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
  },
});
