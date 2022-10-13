import { RangeTimes } from '@/@types/enums';
import { UserPlantModel } from '@/domain/models';
import { MyGardenCardType } from '@/presentation/@types/generics';
import {
  PickerComponent,
  PickerItemComponent,
  TextInputComponent,
} from '@/presentation/components';
import { TextError } from '@/presentation/components/text-input/styles';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { useCallback } from 'react';
import {
  CustomLabelSmall,
  PeriodContainer,
  PeriodSectionContainer,
  styles,
} from './styles';

export interface PeriodSectionComponentProps {
  iconName: MyGardenCardType;
  defaultTimes: UserPlantModel['waterTimes'] | UserPlantModel['sunTimes'];
  defaultRange: UserPlantModel['waterRange'] | UserPlantModel['sunRange'];
  onChange?: (key: 'times' | 'range', value: ItemValue | number) => void;
  hasError?: boolean;
}

export const PeriodSectionComponent: React.FC<PeriodSectionComponentProps> = ({
  iconName,
  defaultRange,
  defaultTimes,
  onChange = () => null,
  hasError,
}) => {
  const ranges = Object.keys(RangeTimes).map((key) => ({
    label: RangeTimes[key as keyof typeof RangeTimes],
    value: key,
  }));

  const renderPeriodsItem = useCallback(() => {
    return ranges.map((range, index) => (
      <PickerItemComponent {...range} key={index} />
    ));
  }, []);

  return (
    <PeriodSectionContainer>
      <PeriodContainer>
        <CustomLabelSmall>A cada:</CustomLabelSmall>
        <TextInputComponent
          iconName={iconName}
          iconSize={16}
          placeholderText="0"
          style={styles.inputPeriodNumberContainer}
          styleInput={styles.inputPeriodNumber}
          keyboardType="number-pad"
          value={String(defaultTimes || '')}
          onChangeText={(text) => onChange('times', Number(text) || 0)}
          enforceErrorFocus={hasError}
        />
        <PickerComponent
          selectedValue={defaultRange || ''}
          onValueChange={(value) => onChange('range', value)}
          enforceErrorFocus={hasError}
        >
          {renderPeriodsItem()}
        </PickerComponent>
      </PeriodContainer>
      {hasError ? (
        <TextError>Neste caso é necessário preencher os dois campos</TextError>
      ) : null}
    </PeriodSectionContainer>
  );
};
