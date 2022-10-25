import { MotiView, useDynamicAnimation } from 'moti';
import { StyleSheet, View } from 'react-native';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { styles } from './styles';

export interface AnimatedHeightComponentProps {
  hide: boolean;
  initialHeight?: number;
  onHeightDidAnimate?: (height: number) => void;
}

export const AnimatedHeightComponent: React.FC<
  AnimatedHeightComponentProps
> = ({ hide = false, initialHeight = 0, onHeightDidAnimate, children }) => {
  const measuredHeight = useSharedValue(initialHeight);
  const state = useDynamicAnimation(() => {
    return {
      height: initialHeight,
    };
  });

  useDerivedValue(() => {
    let height = Math.ceil(measuredHeight.value);
    if (hide) height = 0;

    state.animateTo({
      height,
      opacity: 1,
    });
  }, [hide, measuredHeight]);

  return (
    <MotiView
      state={state}
      transition={{ type: 'timing' }}
      onDidAnimate={
        onHeightDidAnimate &&
        ((key, __, _, { attemptedValue }) =>
          key == 'height' && onHeightDidAnimate(attemptedValue as number))
      }
      style={[styles.hidden]}
    >
      <View
        style={[StyleSheet.absoluteFill, styles.autoBottom]}
        onLayout={({ nativeEvent }) => {
          measuredHeight.value = nativeEvent.layout.height;
        }}
      >
        {children}
      </View>
    </MotiView>
  );
};
