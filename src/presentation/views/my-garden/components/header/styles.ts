import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
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

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-right: 8px;
`;

export const ButtonNewPlant = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  width: 33px;
  height: 33px;
  justify-content: center;
  align-items: center;
`;
