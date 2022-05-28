import { StyleProp, ViewStyle } from 'react-native';
import { Legend } from './styles';

export interface LegendComponentProps {
  children: string;
  style?: StyleProp<ViewStyle>;
}

export const LegendComponent: React.FC<LegendComponentProps> = ({
  children,
  style,
}) => <Legend style={style}>{children}</Legend>;
