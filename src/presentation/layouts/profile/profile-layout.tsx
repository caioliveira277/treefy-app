import { Container, Content, Ilustation, Title, Image, Header } from './styles';
import profileHeaderLayout from '@assets/images/profile-header-background.png';
import { ImageSourcePropType } from 'react-native';
import { useEffect, useState } from 'react';
import { PageLoadingComponent } from '@/presentation/components';

export interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
  image: ImageSourcePropType;
  imageRounded?: boolean;
  isLoading?: boolean;
}
export const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  title,
  image,
  imageRounded = false,
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
        <Ilustation source={profileHeaderLayout} resizeMode="cover" />
        <Content>
          <Header>
            <Image
              source={image}
              resizeMode="center"
              imageRounded={imageRounded}
            />
            <Title>{title}</Title>
          </Header>
          {children}
        </Content>
      </Container>
      {loading ? <PageLoadingComponent /> : null}
    </>
  );
};
