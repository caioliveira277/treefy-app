import { Container, Content, Ilustation, Title, Image, Header } from './styles';
import profileHeaderLayout from '@assets/images/profile-header-background.png';
import { ImageSourcePropType } from 'react-native';

export interface ProfileLayoutProps {
  children: React.ReactNode;
  slotHeader?: React.ReactNode;
  title: string;
  image: ImageSourcePropType;
}
export const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  slotHeader,
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
          {slotHeader || null}
        </Header>
        {children}
      </Content>
    </Container>
  );
};
