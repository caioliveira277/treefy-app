import { getIcon } from '@/presentation/utils';
import { useState } from 'react';
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

export const RateComponent: React.FC = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleActiveIndex = (index: number) => {
    setActiveIndex(index + 1);
  };
  const isActive = (index: number) => activeIndex - 1 >= index;

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
        <ButtonSendRate style={{ ...theme.shadows.sm }} activeOpacity={0.5}>
          <TextButtonSendRate>Enviar</TextButtonSendRate>
        </ButtonSendRate>
      ) : null}
    </Container>
  );
};
