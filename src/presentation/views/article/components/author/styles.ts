import styled from 'styled-components/native';

export const Container = styled.View`
  border: ${({ theme }) => `1px solid ${theme.colors.placeholder_light}`};
  border-left-width: 0;
  border-right-width: 0;
  padding: 30px 0;
  margin: 30px 0;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-bottom: 10px;
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const NameDescriptionContainer = styled.View`
  flex: 1;
`;

export const Image = styled.Image`
  width: 47px;
  height: 47px;
  border-radius: 94px;
  margin-right: 10px;
`;

export const Name = styled(Title)`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  margin-bottom: 5px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.body};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
`;
