import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

export const ButtonNewPlant = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  width: 33px;
  height: 33px;
  justify-content: center;
  align-items: center;
`;
