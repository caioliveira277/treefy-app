import {
  CardEmptyContainer,
  CardEmptyBackgroundImage,
  CardEmptyText,
} from './styles';
import emptyContent from '@assets/images/empty-content.png';
import { StyleProp, ViewStyle } from 'react-native';

export interface EmptyContentComponentProps {
  description: string;
  style?: StyleProp<ViewStyle>;
}

export const EmptyContentComponent: React.FC<EmptyContentComponentProps> = ({
  description,
  style,
}) => {
  return (
    <CardEmptyContainer style={style}>
      <CardEmptyBackgroundImage source={emptyContent} resizeMode="stretch" />
      <CardEmptyText>{description}</CardEmptyText>
    </CardEmptyContainer>
  );
};
