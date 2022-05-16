import styled from 'styled-components/native';
import { ButtonType } from './button-component';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
`;
export const Button = styled.TouchableOpacity<{ type: ButtonType }>`
  padding: 10px 46px;
  background-color: ${({ theme, type }) =>
    type === 'outline' ? theme.colors.white : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  border: 1px solid
    ${({ theme, type }) =>
      type === 'outline'
        ? theme.colors.placeholder_light
        : theme.colors.primary};
  min-width: 200px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text<{ type: ButtonType }>`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  color: ${({ theme, type }) =>
    type === 'outline' ? theme.colors.body : theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.families.medium};
`;
