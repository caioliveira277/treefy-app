import { useEffect, useMemo, useRef, useCallback } from 'react';
import { ModalState } from '@/presentation/@types/generics';
import { Container, DarkMask, styles } from './styles';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleProp, Text, ViewStyle } from 'react-native';

export interface BackdropFormComponentProps {
  style?: StyleProp<ViewStyle>;
  modalState: ModalState;
  onClose?: (closeState: ModalState) => void;
}

export const BackdropFormComponent: React.FC<BackdropFormComponentProps> = ({
  modalState,
  onClose = () => null,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '95%'], []);

  const handleClose = useCallback(() => {
    onClose(ModalState.close);
  }, []);

  useEffect(() => {
    if (modalState === ModalState.open) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [modalState]);

  return (
    <>
      {modalState === ModalState.open ? <DarkMask /> : null}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        index={-1}
        onClose={handleClose}
        style={styles.bottomSheetContainer}
      >
        <BottomSheetScrollView style={styles.bottomSheetScrollView}>
          <Container>
            <Text>Teste</Text>
          </Container>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};
