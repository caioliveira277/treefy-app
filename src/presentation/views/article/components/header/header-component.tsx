import { useTheme } from 'styled-components';
import { HeaderLoadingComponent } from './header-loading-component';
import { Banner, BannerContainer, Title } from './styles';

export interface HeaderComponentProps {
  title: string;
  banner: string;
  isLoading: boolean;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  title,
  banner,
  isLoading,
}) => {
  const theme = useTheme();
  return isLoading ? (
    <HeaderLoadingComponent />
  ) : (
    <>
      <Title>{title}</Title>
      <BannerContainer style={{ ...theme.shadows.sm }}>
        <Banner source={{ uri: banner }} resizeMode="cover" />
      </BannerContainer>
    </>
  );
};
