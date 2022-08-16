import styled from 'styled-components/native';
import { transparentize } from 'polished';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${({ theme }) => transparentize(0.08, theme.colors.white)};
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  text-align: center;
  margin-bottom: 15px;
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  text-align: center;
`;
