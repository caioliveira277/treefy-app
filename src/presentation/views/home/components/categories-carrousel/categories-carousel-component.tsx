import { useTheme } from 'styled-components/native';
import {
  Container,
  ItemContainer,
  Corrousel,
  Title,
  ItemImage,
  ItemText,
  ContainerShadow,
  ActivePoint,
  style,
} from './styles';
import categoryCactusImage from '@assets/images/category-cactus.png';
import categoryPlantsImage from '@assets/images/category-plants.png';

const temporaryData = [
  {
    title: 'Cactos',
    image: categoryCactusImage,
    active: true,
  },
  {
    title: 'Alfaces',
    image: categoryPlantsImage,
    active: false,
  },
  {
    title: 'Alfaces',
    image: categoryPlantsImage,
    active: false,
  },
  {
    title: 'Alfaces',
    image: categoryPlantsImage,
    active: false,
  },
  {
    title: 'Alfaces',
    image: categoryPlantsImage,
    active: false,
  },
];

export const CategoriesCarrouselComponent: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <Title>Categorias</Title>
      <Corrousel horizontal={true}>
        {temporaryData.map((item, index) => (
          <ItemContainer
            active={item.active}
            style={item.active ? style.active : null}
            key={index}
          >
            <ContainerShadow style={{ ...theme.shadows.sm }}>
              <ItemImage source={item.image} resizeMode="center" />
            </ContainerShadow>
            <ItemText active={item.active}>{item.title}</ItemText>
            {item.active ? <ActivePoint /> : null}
          </ItemContainer>
        ))}
      </Corrousel>
    </Container>
  );
};
