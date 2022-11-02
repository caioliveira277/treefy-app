import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { Container } from './styles';

export interface LoadingOverlayComponentProps {
  adjustYPosition?: number;
  size?: number;
}

export const LoadingOverlayComponent: React.FC<
  LoadingOverlayComponentProps
> = ({ adjustYPosition = 0, size = 25 }) => {
  const theme = useTheme();
  return (
    <Container>
      <ActivityIndicator
        size={size}
        color={theme.colors.primary}
        style={{ marginBottom: adjustYPosition }}
      />
    </Container>
  );
};
