import styled from 'styled-components/native';

export const Container = styled.View``;

export const Header = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  margin: 20px 0;
`;

export const Paragraph = styled.Text`
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  margin-bottom: 10px;
  line-height: 20px;
`;

export const ContainerImage = styled.View`
  justify-content: center;
  width: 100%;
  margin: 10px 0;
`;

export const Caption = styled.Text`
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-style: italic;
  margin-top: 5px;
  line-height: 20px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 220px;
`;

export const ListContainer = styled.View`
  padding-left: 10px;
`;

export const ListItemContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const ListItem = styled.Text`
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  line-height: 20px;
  margin-bottom: 8px;
  margin-left: 8px;
`;

export const Unordered = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  margin-top: 8px;
`;

export const Ordered = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.bold};
  font-size: 10px;
  margin-top: 3px;
`;
