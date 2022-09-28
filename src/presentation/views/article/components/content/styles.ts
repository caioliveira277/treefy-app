import styled from 'styled-components/native';

export const Container = styled.View``;

// image
export const ContainerImage = styled.View`
  justify-content: center;
  width: 100%;
  margin: 10px 0;
`;

export const Image = styled.Image`
  width: 100%;
  height: 220px;
`;

export const Caption = styled.Text`
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-style: italic;
  margin-top: 5px;
  line-height: 20px;
`;

// link
export const LinkContainer = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: flex-start;
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  background: ${({ theme }) => theme.colors.contrast};
  width: 100%;
  margin: 10px 0;
`;

export const LinkImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  margin-right: 10px;
`;

export const LinkContentContainer = styled.View`
  flex: 1;
`;

export const LinkName = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  text-decoration: underline;
  margin-bottom: 5px;
`;

export const LinkDescription = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.regular};
`;

// list
export const ListContainer = styled.View`
  padding: 10px;
`;

export const ListItemContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const Unordered = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  margin-top: 8px;
  margin-right: 10px;
`;

export const Ordered = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.bold};
  font-size: 10px;
  margin-top: 3px;
  margin-right: 10px;
`;
