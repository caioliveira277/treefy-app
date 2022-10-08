import { useEffect, useMemo, useRef, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModalState } from '@/presentation/@types/generics';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  ButtonComponent,
  LegendComponent,
  TextInputComponent,
  PickerComponent,
  PickerItemComponent,
} from '@/presentation/components';
import {
  Container,
  bottomSheetStyles,
  Title,
  Description,
  TextRed,
  styles,
  CustomLabel,
  CustomLabelSmall,
  PeriodContainer,
} from './styles';
import { RangeTimes } from '@/@types/enums';
import { UserPlantModel } from '@/domain/models';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';

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

const ranges = Object.keys(RangeTimes).map((key) => ({
  label: RangeTimes[key as keyof typeof RangeTimes],
  value: key,
}));

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

  const renderPeriodsItem = useCallback(() => {
    return ranges.map((range, index) => (
      <PickerItemComponent {...range} key={index} />
    ));
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
          <PeriodContainer>
            <CustomLabelSmall>A cada:</CustomLabelSmall>
            <TextInputComponent
              iconName="sun"
              iconSize={16}
              placeholderText="0"
              style={styles.inputPeriodNumberContainer}
              styleInput={styles.inputPeriodNumber}
              keyboardType="number-pad"
              value={String(defaultData.sunTimes || '')}
              onChangeText={(text) => onChange('sunTimes', Number(text) || 0)}
            />
            <PickerComponent
              selectedValue={defaultData.sunRange || ''}
              onValueChange={(value) => onChange('sunRange', value)}
            >
              {renderPeriodsItem()}
            </PickerComponent>
          </PeriodContainer>
          <LegendComponent>Regagem:</LegendComponent>
          <CustomLabel>De quanto em quanto tempo?</CustomLabel>
          <PeriodContainer>
            <CustomLabelSmall>A cada:</CustomLabelSmall>
            <TextInputComponent
              iconName="water-drop"
              iconSize={16}
              placeholderText="0"
              style={styles.inputPeriodNumberContainer}
              styleInput={styles.inputPeriodNumber}
              keyboardType="number-pad"
              value={String(defaultData.waterTimes || '')}
              onChangeText={(text) => onChange('waterTimes', Number(text) || 0)}
            />
            <PickerComponent
              selectedValue={defaultData.waterRange || ''}
              onValueChange={(value) => onChange('waterRange', value)}
            >
              {renderPeriodsItem()}
            </PickerComponent>
          </PeriodContainer>
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
