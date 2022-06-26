import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0px 20px;
`;

export const ContainerTitleIcon = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContainerHiddenItem = styled.View`
  background-color: #f5f5f5;
  border-radius: ${({ theme }) => theme.borders.border_radius_md};
  height: 62px;
  padding: 10px;
`;
