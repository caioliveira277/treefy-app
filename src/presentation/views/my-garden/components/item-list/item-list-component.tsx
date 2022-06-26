import { ImageSourcePropType } from 'react-native';
import {
  ContainerItem,
  ItemImage,
  ConteinerItemText,
  ItemTitle,
  ItemDescription,
  ContainerItemTitle,
  ItemSmallText,
} from './styles';

export interface ItemListComponentProps {
  type: 'water' | 'sun';
  image: ImageSourcePropType;
  imageSize?: string;
  title: string;
  smallText?: string;
  description: string;
  borderDashed?: boolean;
}

export const ItemListComponent: React.FC<ItemListComponentProps> = ({
  type,
  image,
  imageSize = '18px',
  title,
  smallText,
  description,
  borderDashed = true,
}) => {
  return (
    <ContainerItem type={type} borderDashed={borderDashed}>
      <ItemImage source={image} imageSize={imageSize} resizeMode="center" />
      <ConteinerItemText>
        <ContainerItemTitle>
          <ItemTitle>{title}</ItemTitle>
          {smallText ? <ItemSmallText>{smallText}</ItemSmallText> : null}
        </ContainerItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ConteinerItemText>
    </ContainerItem>
  );
};
