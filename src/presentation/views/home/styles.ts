import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const ContainerPadding = styled.View`
  padding: 0 20px;
`;
