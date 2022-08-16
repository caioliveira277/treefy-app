import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';
import { Legend } from './styles';

export interface LegendComponentProps {
  children: string;
  style?: StyleProp<ViewStyle>;
}

export const LegendComponent: React.FC<LegendComponentProps> = ({
  children,
  style,
}) => {
  const theme = useTheme();

  return (
    <Legend style={style} theme={theme}>
      {children}
    </Legend>
  );
};
