import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { ModalState } from '@/presentation/@types/generics';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import {} from '@/presentation/components';
import { Container, bottomSheetStyles, Title, Description } from './styles';
import { UserPlantModel } from '@/domain/models';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { SearchInputComponent } from '@/presentation/components';

export interface BackdropSelectSpecieProps {
  modalState: ModalState;
  onClose?: (closeState: ModalState) => void;
  onChange?: (
    key: keyof UserPlantModel,
    value: string | number | ItemValue
  ) => void;
  onSelect?: (formData: UserPlantModel) => void;
}

export const BackdropSelectSpecieComponent: React.FC<
  BackdropSelectSpecieProps
> = ({ modalState, onClose = () => null }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '85%'], []);
  const [search, setSearch] = useState('');

  const isOpen = () => modalState === ModalState.open;

  const handleClose = useCallback(() => {
    onClose(ModalState.close);
  }, []);

  console.log(search);
  useEffect(() => {
    if (isOpen()) {
      bottomSheetRef.current?.snapToIndex(1);
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
        <Container>
          <Title>Selecione a espécie</Title>
          <Description>
            Essa seleção é opicinal e você pode mudar a qualquer momento
          </Description>
          <SearchInputComponent
            titleFontSize="lg"
            onSubmit={setSearch}
            placeholder="Encontre pelo nome da espécie"
            infoMessage="Ex: Girassol Arranha-Céu,  Girassol Gigante Americano..."
          />
        </Container>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
