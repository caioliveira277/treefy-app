import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

export const ContainerPadding = styled.View`
  padding: 0 20px;
`;

export const ContainerProfile = styled(ContainerPadding)`
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
`;

export const ImageProfile = styled.Image`
  width: 44px;
  height: 44px;
`;

export const ProfileSaluteContainer = styled.View`
  margin-left: 10px;
`;
export const ProfileSalute = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
`;

export const SearchContainer = styled(ContainerPadding)`
  margin-top: 30px;
`;

export const SearchLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
`;

export const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  background: red;
  border-radius: 5px;
`;

export const SearchInput = styled.TextInput``;

export const SearchButton = styled.TouchableOpacity``;

export const SearchInformativeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.body};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
`;
