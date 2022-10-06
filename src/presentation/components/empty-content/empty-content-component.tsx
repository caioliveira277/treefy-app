import {
  CardEmptyContainer,
  CardEmptyBackgroundImage,
  CardEmptyText,
} from './styles';
import emptyContent from '@assets/images/empty-content.png';

export interface EmptyContentComponentProps {
  description: string;
}

export const EmptyContentComponent: React.FC<EmptyContentComponentProps> = ({
  description,
}) => {
  return (
    <CardEmptyContainer>
      <CardEmptyBackgroundImage source={emptyContent} resizeMode="stretch" />
      <CardEmptyText>{description}</CardEmptyText>
    </CardEmptyContainer>
  );
};
