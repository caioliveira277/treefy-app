import { ModalState, MyGardenItem } from '@/presentation/@types/generics';
import Plant1Image from '@assets/images/plant1.png';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  bottomSheetStyles,
  ContainerContent,
  ContainerItem,
  ItemDescription,
  ItemImage,
  ItemTitle,
} from '../backdrop-form/styles';
import {
  ConfirmDescription,
  ConfirmTitle,
  Container,
  styles,
  TextBold,
} from './styles';
import { ButtonComponent } from '@/presentation/components';
import { useTheme } from 'styled-components';

export interface BackdropDeleteConfirmProps {
  modalState: ModalState;
  item: MyGardenItem | null;
  onConfirm?: (item: MyGardenItem) => void;
  onClose?: (closeState: ModalState) => void;
}

export const BackdropDeleteConfirmComponent: React.FC<
  BackdropDeleteConfirmProps
> = ({ modalState, item, onConfirm = () => null, onClose = () => null }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['45%'], []);
  const theme = useTheme();

  const isOpen = () => modalState === ModalState.open;

  const handleClose = useCallback(() => {
    onClose(ModalState.close);
  }, []);

  useEffect(() => {
    if (isOpen()) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [modalState]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      onClose={handleClose}
      containerStyle={{
        backgroundColor: isOpen() ? '#00000040' : 'transparent',
      }}
      handleIndicatorStyle={bottomSheetStyles.indicator}
    >
      <BottomSheetScrollView style={bottomSheetStyles.bottomSheetScrollView}>
        <Container style={styles.withPaddingX}>
          <ConfirmTitle>Deseja deletar a planta?</ConfirmTitle>
          <ConfirmDescription>
            Essa confirmação irá deletar todas as tarefas cadatradas da planta{' '}
            <TextBold>{item?.name}</TextBold>
          </ConfirmDescription>
        </Container>
        <ContainerItem
          disabled
          withBorder
          style={{ borderColor: theme.colors.error }}
        >
          <ContainerContent>
            <ItemTitle>{item?.name}</ItemTitle>
            <ItemDescription>{item?.annotation}</ItemDescription>
          </ContainerContent>
          <ItemImage source={Plant1Image} />
        </ContainerItem>
        <Container>
          <ButtonComponent
            onPress={() => onConfirm(item as MyGardenItem)}
            style={styles.confirmButton}
          >
            Confirmar
          </ButtonComponent>
        </Container>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
