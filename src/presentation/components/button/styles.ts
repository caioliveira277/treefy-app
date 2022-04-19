import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
`;
export const Button = styled.TouchableOpacity`
  padding: 10px 46px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  min-width: 200px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.families.medium};
`;
