import { getIcon } from '@/presentation/utils';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import {
  Container,
  ContainerTitle,
  HeartIcon,
  Title,
  Paragraph,
  Bold,
  SelectContainer,
  SelectItem,
  ItemText,
  HeartIconSelect,
  ButtonSendRate,
  TextButtonSendRate,
} from './styles';

export interface RateComponentProps {
  ratingPoints: number | null;
}

export const RateComponent: React.FC<RateComponentProps> = ({
  ratingPoints,
}) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleActiveIndex = (index: number) => {
    setActiveIndex(index + 1);
  };
  const isActive = (index: number) => activeIndex - 1 >= index;

  useEffect(() => {
    if (ratingPoints) setActiveIndex(ratingPoints - 1);
  }, [ratingPoints]);

  return (
    <Container>
      <ContainerTitle>
        <Title>Você gostou desse artigo?</Title>
        <HeartIcon source={getIcon('heart')} resizeMode="center" />
      </ContainerTitle>
      <Paragraph>
        Em uma escala de 1 a 5 selecione o quanto você gostou do conteúdo desse
        artigo, sendo 1 para <Bold>“não gostei”</Bold> e 5 para{' '}
        <Bold>“gostei muito”</Bold>
      </Paragraph>
      <SelectContainer>
        {Array(5)
          .fill(null)
          .map((_v, index) => (
            <SelectItem
              key={index}
              disabled={!!ratingPoints}
              onPress={() => handleActiveIndex(index)}
              activeOpacity={0.8}
            >
              <HeartIconSelect
                active={isActive(index)}
                source={getIcon('heart')}
                resizeMode="center"
              />
              <ItemText active={isActive(index)}>{index + 1}</ItemText>
            </SelectItem>
          ))}
      </SelectContainer>
      {activeIndex > 0 ? (
        <ButtonSendRate
          disabled={!!ratingPoints}
          style={{ ...theme.shadows.sm }}
          activeOpacity={0.5}
        >
          <TextButtonSendRate>
            {!ratingPoints ? 'Enviar' : 'Avaliação respondida!'}
          </TextButtonSendRate>
        </ButtonSendRate>
      ) : null}
    </Container>
  );
};
