import styled from 'styled-components/native';
import { ContainerPadding } from '../../styles';

export const Container = styled(ContainerPadding)`
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const Image = styled.Image`
  width: 44px;
  height: 44px;
`;

export const SaluteContainer = styled.View`
  margin-left: 10px;
`;

export const SaluteText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
`;
