import { SkeletonLoadingComponent } from '@/presentation/components';
import { View } from 'moti';

export const StatusLoadingComponent: React.FC = () => {
  const quantity = 1;

  return (
    <View
      style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}
    >
      {Array(quantity)
        .fill('')
        .map((_, index) => (
          <SkeletonLoadingComponent
            key={index}
            skeletons={[
              {
                width: 20,
                height: 20,
              },
            ]}
            containerStyle={{
              position: 'absolute',
              top: -20,
            }}
          />
        ))}
    </View>
  );
};
