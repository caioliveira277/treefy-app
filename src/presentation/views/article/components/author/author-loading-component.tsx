import { SkeletonLoadingComponent } from '@/presentation/components';
import { View } from 'react-native';
import { ContentContainer } from './styles';

export const AuthorLoadingComponent: React.FC = () => {
  const quantity = 1;

  return (
    <>
      {Array(quantity)
        .fill('')
        .map((_, index) => (
          <View key={index}>
            <SkeletonLoadingComponent
              containerStyle={{ marginRight: 10 }}
              skeletons={[
                {
                  width: '40%',
                  height: 10,
                },
              ]}
            />
            <ContentContainer style={{ alignItems: 'center' }}>
              <SkeletonLoadingComponent
                containerStyle={{ marginRight: 10 }}
                skeletons={[
                  {
                    width: 47,
                    height: 47,
                    radius: 94,
                  },
                ]}
              />
              <SkeletonLoadingComponent
                skeletons={[
                  {
                    width: '70%',
                    height: 8,
                  },
                  {
                    width: '40%',
                    height: 8,
                  },
                ]}
              />
            </ContentContainer>
          </View>
        ))}
    </>
  );
};
