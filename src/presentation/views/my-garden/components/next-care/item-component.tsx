import { MyGardenCardType, MyGardenItem } from '@/presentation/@types/generics';
import {
  formatDateTimeToComplete,
  getIcon,
  IconName,
} from '@/presentation/utils';
import { MotiView, useAnimationState } from 'moti';
import { ListRenderItemInfo } from 'react-native';
import { useTheme } from 'styled-components';
import Plant1Image from '@assets/images/plant1.png';
import {
  ContainerContent,
  ContainerItem,
  ContainerItemTitle,
  ConteinerItemText,
  DeleteMask,
  Icon,
  ItemDescription,
  ItemImage,
  ItemSubtitle,
  ItemTitle,
  styles,
} from './styles';
import { useCallback, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

export interface ItemComponentProps extends ListRenderItemInfo<MyGardenItem> {
  onLongPress?: () => void;
}

export const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  onLongPress = () => null,
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const theme = useTheme();
  const pressAnimated = useAnimationState({
    pressOut: {
      opacity: 0,
    },
    pressIn: {
      opacity: 0.4,
    },
  });

  const isSun = (type: MyGardenCardType) => type === 'sun';

  const updateTime = useCallback(() => {
    setCurrentTime(
      isSun(item.type)
        ? formatDateTimeToComplete(
            item.lastSunExposure,
            item.sunTimes,
            item.sunRange
          ).distance
        : formatDateTimeToComplete(
            item.lastWatering,
            item.waterTimes,
            item.waterRange
          ).distance
    );
  }, []);

  useEffect(() => {
    const intervalID = setInterval(updateTime, 10000);
    updateTime();
    return () => clearInterval(intervalID);
  }, [updateTime]);

  useEffect(() => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Oba! Já é hora de cuidar da sua plantinha 🌱`,
        body: `A ${item.name} precisa ${
          isSun(item.type) ? 'tomar sol' : 'ser regada'
        } agora!`,
      },
      trigger: {
        date: formatDateTimeToComplete(
          item.lastSunExposure,
          item.sunTimes,
          item.sunRange
        ).dateTime,
      },
    });
  }, [item]);

  return (
    <ContainerContent
      key={item.id}
      onPressIn={() => pressAnimated.transitionTo('pressIn')}
      onPressOut={() => pressAnimated.transitionTo('pressOut')}
      onLongPress={onLongPress}
      delayLongPress={350}
      delayPressIn={400}
      delayPressOut={400}
      underlayColor="white"
      style={{
        ...theme.shadows.sm,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
      }}
    >
      <>
        <ContainerItem type={item.type}>
          <ConteinerItemText>
            <ContainerItemTitle>
              <Icon
                source={getIcon(item.type as IconName)}
                width={11}
                height={12}
                resizeMode="center"
              />
              {item.type === 'incompleted' ? (
                <ItemTitle type={item.type}>Nenhuma tarefa agendada</ItemTitle>
              ) : !item.started ? (
                <ItemTitle type={item.type}>Arraste para iniciar</ItemTitle>
              ) : (
                <ItemTitle type={item.type}>
                  {isSun(item.type) ? 'Expor ao sol' : 'Regar'}
                  {!currentTime ? ' agora!' : ` daqui a: ${currentTime}`}
                </ItemTitle>
              )}
            </ContainerItemTitle>
            <ItemSubtitle type={item.type}>{item.name}</ItemSubtitle>
            <ItemDescription type={item.type}>
              {item.annotation}
            </ItemDescription>
          </ConteinerItemText>
          <ItemImage
            type={item.type}
            source={item?.specie ? { uri: item.specie.image } : Plant1Image}
            resizeMode="cover"
          />
        </ContainerItem>
        <MotiView
          state={pressAnimated}
          style={styles.motiView}
          transition={{
            type: 'timing',
          }}
          animateInitialState
          from={{
            opacity: 0,
          }}
        >
          <DeleteMask />
        </MotiView>
      </>
    </ContainerContent>
  );
};
