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
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const ToastMessageComponent: React.FC<ToastMessageComponentProps> = ({
  title,
  message,
  type,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Toast
        theme={theme}
        style={{ borderColor: theme.colors.placeholder_light, borderWidth: 1 }}
      >
        <Image source={ToastBackground} resizeMode="center" />
        <Status theme={theme} type={type} />
        <Content>
          <Title theme={theme} type={type}>
            {title}
          </Title>
          <Message theme={theme}>{message}</Message>
        </Content>
      </Toast>
    </Container>
  );
};
