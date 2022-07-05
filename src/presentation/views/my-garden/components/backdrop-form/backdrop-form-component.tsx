import { StyleProp, Text, ViewStyle } from 'react-native';
import { useEffect } from 'react';
import { Container } from './styles';
import { ModalState } from '@/presentation/@types/generics';

export interface BackdropFormComponentProps {
  style?: StyleProp<ViewStyle>;
  modalState: ModalState;
}

export const BackdropFormComponent: React.FC<BackdropFormComponentProps> = ({
  modalState,
}) => {
  useEffect(() => {}, [modalState]);

  return (
    <Container>
      <Text>content</Text>
    </Container>
  );
};
