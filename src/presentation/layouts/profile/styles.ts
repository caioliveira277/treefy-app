import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const Ilustation = styled.Image`
  width: 100%;
  height: 240px;
  position: absolute;
`;

export const Header = styled.View`
  align-items: center;
  width: 100%;
  margin: 40px 0px;
`;

export const Image = styled.Image`
  width: 127px;
  height: 127px;
  border-radius: 252px;
  margin-bottom: 25px;
`;

export const Content = styled.View`
  padding: 0 20px;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  text-align: center;
`;
