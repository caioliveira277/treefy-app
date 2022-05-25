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

export interface StatusComponentProps {
  style?: StyleProp<ViewStyle>;
}

export const StatusComponent: React.FC<StatusComponentProps> = ({ style }) => {
  return (
    <Container style={style}>
      <Title>Seus status:</Title>
      <StatusContainer>
        <StatusItemContainer>
          <StatusTitle>Artigos visualizados</StatusTitle>
          <StatusValueContainer>
            <Image source={statusBackground1} resizeMode="center" />
            <StatusValue>56</StatusValue>
          </StatusValueContainer>
        </StatusItemContainer>
        <StatusItemContainer>
          <StatusTitle>Feedbacks</StatusTitle>
          <StatusValueContainer>
            <Image source={statusBackground2} resizeMode="center" />
            <StatusValue>12</StatusValue>
          </StatusValueContainer>
        </StatusItemContainer>
      </StatusContainer>
    </Container>
  );
};
