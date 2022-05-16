import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Point = styled.TouchableOpacity<{ active: boolean }>`
  width: ${({ active }) => (active ? '54px' : '16px')};
  height: 16px;
  border-radius: 30px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.placeholder_light};
  margin: 0 8px;
`;
