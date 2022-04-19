import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  margin-bottom: 10px;
`;

export const ContainerInput = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  border: 1.5px solid ${({ theme }) => theme.colors.placeholder_light};
  border-radius: ${({ theme }) => theme.borders.border_radius_sm};
  background: ${({ theme }) => theme.colors.white};
  min-height: 45px;
  position: relative;
`;

const iconSize = '24px';
export const GenericIcon = styled.Image`
  width: ${iconSize};
  position: absolute;
  left: 10px;
`;

export const PasswordIcon = styled.Image`
  width: ${iconSize};
`;

export const VisibilityPasswordButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  width: 50px;
  height: 45px;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  width: 100%;
  font-size: 14px;
  padding-left: 38px;
  padding-right: 42px;
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.secondary};
`;
