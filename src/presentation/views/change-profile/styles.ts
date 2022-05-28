import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const EditProfileImageButton = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.white};
  padding: 8px;
  border-radius: 5px;
  position: absolute;
  bottom: 48px;
  right: 34%;
`;

export const EditIcon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const spacing = StyleSheet.create({
  input: {
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 30,
  },
  button: {
    marginTop: 40,
    marginBottom: 40,
  },
});
