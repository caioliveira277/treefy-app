import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 20px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StatusItemContainer = styled.View`
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0px 15px;
  padding-bottom: 25px;
`;

export const StatusTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.body};
`;

export const StatusValueContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 35px;
`;

export const Image = styled.Image`
  width: 66px;
  height: 67px;
  position: absolute;
`;

export const StatusValue = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-family: ${({ theme }) => theme.fonts.families.bold};
  color: ${({ theme }) => theme.colors.secondary};
`;
