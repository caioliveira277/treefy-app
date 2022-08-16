import { Container, Content, Ilustation, Title, Paragraph } from './styles';
import palmTreesIlustration from '@assets/images/palm-trees-ilustration.png';
import { PageLoadingComponent } from '@/presentation/components';
import { useEffect, useState } from 'react';

export interface PublicLayoutProps {
  children: React.ReactNode;
  title: string;
  paragraph?: string;
  isLoading?: boolean;
}
export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  title,
  paragraph,
  isLoading = false,
}) => {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setLoading(isLoading);
      }, 500);
    } else {
      setLoading(isLoading);
    }
  }, [isLoading]);
  return (
    <>
      <Container>
        <Ilustation source={palmTreesIlustration} resizeMode="cover" />
        <Content>
          <Title>{title}</Title>
          {paragraph ? <Paragraph>{paragraph}</Paragraph> : null}
          {children}
        </Content>
      </Container>
      {loading ? <PageLoadingComponent /> : null}
    </>
  );
};
