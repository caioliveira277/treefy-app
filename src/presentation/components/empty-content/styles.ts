import styled from 'styled-components/native';

export const CardEmptyContainer = styled.View`
  height: 210px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;
export const CardEmptyBackgroundImage = styled.Image`
  width: 100%;
  height: 210px;
  position: absolute;
`;
export const CardEmptyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 40px;
`;
