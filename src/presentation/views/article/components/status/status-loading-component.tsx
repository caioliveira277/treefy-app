import { SkeletonLoadingComponent } from '@/presentation/components';
import {
  CategoryContainer,
  Container,
  DateContainer,
  RateContainer,
} from './styles';

export const StatusLoadingComponent: React.FC = () => {
  const quantity = 1;

  return (
    <>
      {Array(quantity)
        .fill('')
        .map((_, index) => (
          <Container key={index} style={{ alignItems: 'flex-start' }}>
            <CategoryContainer>
              <SkeletonLoadingComponent
                skeletons={[
                  {
                    width: 80,
                    height: 8,
                  },
                  {
                    width: 40,
                    height: 8,
                  },
                ]}
              />
            </CategoryContainer>
            <RateContainer>
              <SkeletonLoadingComponent
                skeletons={[
                  {
                    width: 15,
                    height: 15,
                  },
                ]}
              />
            </RateContainer>
            <DateContainer>
              <SkeletonLoadingComponent
                containerStyle={{
                  alignItems: 'flex-end',
                }}
                skeletons={[
                  {
                    width: 80,
                    height: 8,
                  },
                  {
                    width: 40,
                    height: 8,
                  },
                ]}
              />
            </DateContainer>
          </Container>
        ))}
    </>
  );
};
