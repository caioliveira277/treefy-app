import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-right: 8px;
`;

export const ContainerTitleIcon = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const Icon = styled.Image`
  width: 18px;
  height: 18px;
`;

export const DescriptionBold = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.bold};
`;

export const spacing = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  nextCare: {
    marginBottom: 40,
  },
  list: {
    marginBottom: 40,
  },
});
