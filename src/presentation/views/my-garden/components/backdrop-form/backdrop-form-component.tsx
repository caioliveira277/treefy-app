import { useEffect, useMemo, useRef, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModalState } from '@/presentation/@types/generics';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  ButtonComponent,
  LegendComponent,
  TextInputComponent,
} from '@/presentation/components';
import {
  Container,
  bottomSheetStyles,
  Title,
  Description,
  TextRed,
  styles,
  CustomLabel,
} from './styles';
import { UserPlantModel } from '@/domain/models';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { PeriodSectionComponent } from './period-section-component';

export interface BackdropFormComponentProps {
  style?: StyleProp<ViewStyle>;
  modalState: ModalState;
  defaultData: UserPlantModel;
  errors: Record<keyof UserPlantModel, string>;
  onClose?: (closeState: ModalState) => void;
  onChange?: (
    key: keyof UserPlantModel,
    value: string | number | ItemValue
  ) => void;
  onSubmit?: (formData: UserPlantModel) => void;
}

export const BackdropFormComponent: React.FC<BackdropFormComponentProps> = ({
  modalState,
  defaultData,
  errors,
  onClose = () => null,
  onSubmit = () => null,
  onChange = () => null,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '95%'], []);

  const isOpen = () => modalState === ModalState.open;

  const handleClose = useCallback(() => {
    onClose(ModalState.close);
  }, []);

  const isUpdate = () => !!defaultData.id;

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
          <Title>{isUpdate() ? 'Alterar informações' : 'Nova planta'}</Title>
          <Description>
            Os campos obrigatórios estão marcados com um “<TextRed>*</TextRed>”,
            se ainda não sabe muito sobre a sua nova planta, não se preocupe!
            Você pode adicionar as outras informações a qualquer momento.
          </Description>
          <LegendComponent>Sobre a planta:</LegendComponent>
          <TextInputComponent
            label={
              <>
                Nome da planta: <TextRed>*</TextRed>
              </>
            }
            iconName="plant-active"
            iconSize={18}
            placeholderText="Nome da plantinha"
            style={styles.input}
            value={defaultData.name}
            onChangeText={(text) => onChange('name', text)}
            errorMessage={errors.name}
          />
          <TextInputComponent
            label="Anotações:"
            iconName="content"
            type="textarea"
            iconSize={15}
            placeholderText="Caracteristicas, cor..."
            style={styles.input}
            value={defaultData.annotation}
            onChangeText={(text) => onChange('annotation', text)}
          />
          <TextInputComponent
            label="Espécie:"
            iconName="search"
            iconSize={16}
            placeholderText="Encontre a espécie"
            style={styles.input}
          />
          <LegendComponent>Exposição ao sol:</LegendComponent>
          <CustomLabel>De quanto em quanto tempo?</CustomLabel>
          <PeriodSectionComponent
            iconName="sun"
            defaultTimes={defaultData.sunTimes}
            defaultRange={defaultData.sunRange}
            onChange={(key, value) =>
              onChange(key === 'times' ? 'sunTimes' : 'sunRange', value)
            }
            hasError={!!errors.sunTimes || !!errors.sunRange}
          />
          <LegendComponent>Regagem:</LegendComponent>
          <CustomLabel>De quanto em quanto tempo?</CustomLabel>
          <PeriodSectionComponent
            iconName="water-drop"
            defaultTimes={defaultData.waterTimes}
            defaultRange={defaultData.waterRange}
            onChange={(key, value) =>
              onChange(key === 'times' ? 'waterTimes' : 'waterRange', value)
            }
            hasError={!!errors.waterTimes || !!errors.waterRange}
          />
          <ButtonComponent
            style={styles.button}
            onPress={() => onSubmit(defaultData)}
          >
            {isUpdate() ? 'Atualizar' : 'Salvar'}
          </ButtonComponent>
        </Container>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
