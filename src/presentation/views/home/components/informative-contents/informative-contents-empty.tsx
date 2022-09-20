import {
  CardEmptyContainer,
  CardEmptyBackgroundImage,
  CardEmptyText,
} from './styles';
import emptyContent from '@assets/images/empty-content.png';

export const InformativeContentsEmpty: React.FC = () => {
  return (
    <CardEmptyContainer>
      <CardEmptyBackgroundImage source={emptyContent} resizeMode="stretch" />
      <CardEmptyText>Oops! Nenhum conteúdo encontrado :(</CardEmptyText>
    </CardEmptyContainer>
  );
};
