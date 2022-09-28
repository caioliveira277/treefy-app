import {
  Container,
  Title,
  StatusContainer,
  StatusItemContainer,
  StatusTitle,
  StatusValueContainer,
  Image,
  StatusValue,
} from './styles';
import statusBackground1 from '@assets/images/status-background-1.png';
import statusBackground2 from '@assets/images/status-background-2.png';
import { StyleProp, ViewStyle } from 'react-native';
import { StatusLoadingComponent } from './status-loading-component';

export interface StatusComponentProps {
  style?: StyleProp<ViewStyle>;
  viewedArticles: number;
  countFeedback: number;
  isLoading: boolean;
}

export const StatusComponent: React.FC<StatusComponentProps> = ({
  style,
  viewedArticles,
  countFeedback,
  isLoading,
}) => {
  return (
    <Container style={style}>
      <Title>Seus status:</Title>
      <StatusContainer>
        <StatusItemContainer>
          <StatusTitle>Artigos visualizados</StatusTitle>
          <StatusValueContainer>
            <Image source={statusBackground1} resizeMode="center" />
            {isLoading ? (
              <StatusLoadingComponent />
            ) : (
              <StatusValue>{viewedArticles}</StatusValue>
            )}
          </StatusValueContainer>
        </StatusItemContainer>
        <StatusItemContainer>
          <StatusTitle>Feedbacks</StatusTitle>
          <StatusValueContainer>
            <Image source={statusBackground2} resizeMode="center" />
            {isLoading ? (
              <StatusLoadingComponent />
            ) : (
              <StatusValue>{countFeedback}</StatusValue>
            )}
          </StatusValueContainer>
        </StatusItemContainer>
      </StatusContainer>
    </Container>
  );
};
