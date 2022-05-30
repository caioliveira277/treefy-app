import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding-top: 40px;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const SafeContainer = styled.View`
  margin-bottom: 80px;
`;
