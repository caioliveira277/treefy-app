import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
`;

export const ItemContainer = styled.TouchableOpacity`
  padding: 18px 14px;
  flex-direction: row;
  align-items: center;
`;

export const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.placeholder_light};
`;

export const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.placeholder_light};
  border-radius: 5px;
  width: 38px;
  height: 35px;
  padding: 8px;
  margin-right: 8px;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 22px;
`;

export const TextContainer = styled.View``;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-family: ${({ theme }) => theme.fonts.families.bold};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 4px;
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.body};
`;

export const ArrowIcon = styled.Image`
  width: 7px;
  height: 15px;
  right: 18px;
  position: absolute;
`;
