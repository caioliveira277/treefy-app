import { useTheme } from 'styled-components';
import {
  Container,
  Toast,
  Status,
  Title,
  Content,
  Message,
  Image,
} from './styles';
import ToastBackground from '@assets/images/toast-background.png';

export interface ToastMessageComponentProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export const ToastMessageComponent: React.FC<ToastMessageComponentProps> = ({
  type = 'info',
  title,
  message,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Toast style={{ ...theme.shadows.sm }}>
        <Image source={ToastBackground} resizeMode="center" />
        <Status type={type} />
        <Content>
          <Title type={type}>{title}</Title>
          <Message>{message}</Message>
        </Content>
      </Toast>
    </Container>
  );
};
