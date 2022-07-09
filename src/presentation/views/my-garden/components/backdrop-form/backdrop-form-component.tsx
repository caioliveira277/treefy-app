import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModalState } from '@/presentation/@types/generics';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  ButtonComponent,
  LegendComponent,
  TextInputComponent,
  PickerComponent,
  PickerItemComponent,
  PickerComponentItemValue,
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

export interface BackdropFormComponentProps {
  style?: StyleProp<ViewStyle>;
  modalState: ModalState;
  onClose?: (closeState: ModalState) => void;
}

type Period = { label: string; value: string };
const periods: Period[] = [
  { label: 'Selecione o período', value: '' },
  { label: 'Dias', value: 'days' },
  { label: 'Semanas', value: 'weeks' },
  { label: 'Meses', value: 'months' },
  { label: 'Anos', value: 'years' },
];

export const BackdropFormComponent: React.FC<BackdropFormComponentProps> = ({
  modalState,
  onClose = () => null,
}) => {
  const isOpen = () => modalState === ModalState.open;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '95%'], []);
  const [sunPeriod, setSunPeriod] = useState<PickerComponentItemValue>(
    periods[0].value
  );
  const [waterPeriod, setWaterPeriod] = useState<PickerComponentItemValue>(
    periods[0].value
  );

  useEffect(() => {
    if (isOpen()) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [modalState]);

  const handleClose = useCallback(() => {
    onClose(ModalState.close);
  }, []);

  const renderPeriodsItem = useCallback(() => {
    return periods.map((period, index) => (
      <PickerItemComponent {...period} key={index} />
    ));
  }, []);

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
          <Title>Nova planta</Title>
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
          />
          <TextInputComponent
            label={
              <>
                Anotações: <TextRed>*</TextRed>
              </>
            }
            iconName="content"
            type="textarea"
            iconSize={15}
            placeholderText="Caracteristicas, cor..."
            style={styles.input}
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
            />
            <PickerComponent
              selectedValue={sunPeriod}
              onValueChange={(itemValue) => setSunPeriod(itemValue)}
            >
              {renderPeriodsItem()}
              <PickerItemComponent />
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
            />
            <PickerComponent
              selectedValue={waterPeriod}
              onValueChange={(itemValue) => setWaterPeriod(itemValue)}
            >
              {renderPeriodsItem()}
              <PickerItemComponent />
            </PickerComponent>
          </PeriodContainer>
          <ButtonComponent style={styles.button}>Salvar</ButtonComponent>
        </Container>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
