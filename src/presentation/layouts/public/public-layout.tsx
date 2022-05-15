import {
  Container,
  Content,
  Ilustation,
  Title,
  Paragraph,
  spacing,
} from './styles';
import initialIlustration from '@assets/images/initial-ilustration.png';

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
      <Ilustation source={initialIlustration} resizeMode="cover" />
      <Content>
        <Title style={spacing.title}>{title}</Title>
        {paragraph ? (
          <Paragraph style={spacing.paragraph}>{paragraph}</Paragraph>
        ) : null}
        {children}
      </Content>
    </Container>
  );
};
