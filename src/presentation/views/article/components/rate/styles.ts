import styled from 'styled-components/native';

export const Container = styled.View``;

export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const HeartIcon = styled.Image`
  width: 17px;
  height: 14px;
  margin-left: 8px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Paragraph = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.body};
  margin-bottom: 15px;
`;

export const Bold = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.bold};
`;

export const SelectContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const SelectItem = styled.TouchableOpacity`
  margin-top: 4px;
  margin: 0 5px;
  align-items: center;
  padding: 5px;
`;

export const HeartIconSelect = styled(HeartIcon)<{ active: boolean }>`
  margin: 0px;
  tint-color: ${({ theme, active }) =>
    active ? theme.colors.rate_active : theme.colors.rate_inactive};
`;

export const ItemText = styled.Text<{ active: boolean }>`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme, active }) =>
    active ? theme.colors.rate_active : theme.colors.rate_inactive};
`;

export const ButtonSendRate = styled.TouchableOpacity`
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.rate_active};
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 150px;
  align-self: center;
  border-radius: 30px;
`;

export const TextButtonSendRate = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.white};
`;
