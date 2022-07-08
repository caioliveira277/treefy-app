import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { currentTheme } from '@/presentation/themes';

export const Container = styled.View`
  padding: 0px 20px;
`;

export const DarkMask = styled.View`
  background-color: #00000040;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderRadius: 20,
  },
  bottomSheetScrollView: {
    backgroundColor: currentTheme.colors.contrast,
  },
});
