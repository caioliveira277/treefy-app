import { MyGardenItem } from '@/presentation/@types/generics';
import { getIcon } from '@/presentation/utils';
import { ListRenderItemInfo } from 'react-native';
import { ContainerHiddenContent, ContainerHiddenItem, Icon } from './styles';

export const HiddenItemComponent: React.FC<
  ListRenderItemInfo<MyGardenItem>
> = ({ item }) => (
  <ContainerHiddenItem>
    <ContainerHiddenContent action="edit">
      <Icon
        width={18}
        height={18}
        source={getIcon('edit-white')}
        resizeMode="center"
      />
    </ContainerHiddenContent>
    <ContainerHiddenContent
      action={item.started ? 'complete' : 'start'}
      type={item.type}
    >
      <Icon
        width={22}
        height={22}
        source={getIcon(item.started ? 'check-circle' : 'play')}
        resizeMode="center"
      />
    </ContainerHiddenContent>
  </ContainerHiddenItem>
);
