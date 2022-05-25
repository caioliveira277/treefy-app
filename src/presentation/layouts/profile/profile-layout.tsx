import { Container, Content, Ilustation, Title, Image, Header } from './styles';
import profileHeaderLayout from '@assets/images/profile-header-background.png';
import { ImageSourcePropType } from 'react-native';

export interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
  image: ImageSourcePropType;
}
export const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  title,
  image,
}) => {
  return (
    <Container>
      <Ilustation source={profileHeaderLayout} resizeMode="cover" />
      <Content>
        <Header>
          <Image source={image} />
          <Title>{title}</Title>
        </Header>
        {children}
      </Content>
    </Container>
  );
};
