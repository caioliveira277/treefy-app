import { Container, Content, Ilustation, Title, Paragraph } from './styles';
import palmTreesIlustration from '@assets/images/palm-trees-ilustration.png';

export interface PublicLayoutProps {
  children: React.ReactNode;
  title: string;
  paragraph?: string;
}
export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  title,
  paragraph,
}) => {
  return (
    <Container>
      <Ilustation source={palmTreesIlustration} resizeMode="cover" />
      <Content>
        <Title>{title}</Title>
        {paragraph ? <Paragraph>{paragraph}</Paragraph> : null}
        {children}
      </Content>
    </Container>
  );
};
