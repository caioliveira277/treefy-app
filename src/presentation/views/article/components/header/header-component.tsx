import { useTheme } from 'styled-components';
import { Banner, BannerContainer, Title } from './styles';

export interface HeaderComponentProps {
  title: string;
  banner: string;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  title,
  banner,
}) => {
  const theme = useTheme();
  return (
    <>
      <Title>{title}</Title>
      <BannerContainer style={{ ...theme.shadows.sm }}>
        <Banner source={{ uri: banner }} resizeMode="cover" />
      </BannerContainer>
    </>
  );
};
