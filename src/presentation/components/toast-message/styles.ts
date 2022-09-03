import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 0 30px;
  min-height: 75px;
  margin: 5px 0px;
`;

export const Toast = styled.View`
  background: ${({ theme }) => theme.colors.white};
  flex: 1;
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  overflow: hidden;
  flex-direction: row;
`;

export const Status = styled.View<{ type: keyof DefaultTheme['colors'] }>`
  background: ${({ theme, type }) => theme.colors[type]};
  width: 5px;
  height: 100%;
`;

export const Content = styled.View`
  padding: 8px 5px;
`;

export const Title = styled.Text<{ type: keyof DefaultTheme['colors'] }>`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme, type }) => theme.colors[type]};
  margin-bottom: 5px;
`;

export const Message = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.body};
`;

export const Image = styled.Image`
  width: 26px;
  height: 36px;
  position: absolute;
  right: 0;
  top: 0;
`;
