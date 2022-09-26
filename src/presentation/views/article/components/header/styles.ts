import styled from 'styled-components/native';

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  padding: 0px 20px;
  margin-bottom: 20px;
`;

export const BannerContainer = styled.View`
  margin-bottom: 10px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 230px;
`;
