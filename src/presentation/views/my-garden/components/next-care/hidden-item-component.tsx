import { getIcon } from '@/presentation/utils';
import { ContainerHiddenContent, ContainerHiddenItem, Icon } from './styles';

export const HiddenItemComponent: React.FC = () => (
  <ContainerHiddenItem>
    <ContainerHiddenContent type="edit">
      <Icon
        width={18}
        height={18}
        source={getIcon('edit-white')}
        resizeMode="center"
      />
    </ContainerHiddenContent>
    <ContainerHiddenContent type="complete">
      <Icon
        width={22}
        height={22}
        source={getIcon('check-circle')}
        resizeMode="center"
      />
    </ContainerHiddenContent>
  </ContainerHiddenItem>
);
