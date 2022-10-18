import { MyGardenCardType, MyGardenItem } from '@/presentation/@types/generics';
import { getIcon, IconName } from '@/presentation/utils';
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

export interface ItemComponentProps extends ListRenderItemInfo<MyGardenItem> {
  onLongPress?: () => void;
}

export const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  onLongPress = () => null,
}) => {
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
                  {isSun(item.type) ? 'Expor ao sol' : 'Regar'}{' '}
                  {isSun(item.type) ? item.sunRange : item.waterRange}
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
