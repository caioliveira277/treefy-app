import { SkeletonLoadingComponent } from '@/presentation/components';
import { View } from 'moti';

export const NextCareLoadingComponent: React.FC = () => {
  const quantity = 3;

  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {Array(quantity)
        .fill('')
        .map((_, index) => (
          <SkeletonLoadingComponent
            key={index}
            skeletons={[
              {
                width: '100%',
                height: 85,
                radius: 10,
                style: { marginBottom: 10, marginTop: 10 },
              },
            ]}
          />
        ))}
    </View>
  );
};
