import { SkeletonLoadingComponent } from '@/presentation/components';

export const ContentLoadingComponent: React.FC = () => {
  const quantity = 2;

  return (
    <>
      {Array(quantity)
        .fill('')
        .map((_, index) => (
          <SkeletonLoadingComponent
            key={index}
            skeletons={[
              {
                width: '100%',
                height: 10,
              },
              {
                width: '40%',
                height: 10,
              },
              {
                width: '60%',
                height: 10,
              },
            ]}
          />
        ))}
    </>
  );
};
