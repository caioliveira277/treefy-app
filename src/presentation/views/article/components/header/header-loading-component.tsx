import { SkeletonLoadingComponent } from '@/presentation/components';

export const HeaderLoadingComponent: React.FC = () => {
  const quantity = 1;

  return (
    <>
      {Array(quantity)
        .fill('')
        .map((_, index) => (
          <SkeletonLoadingComponent
            key={index}
            skeletons={[
              {
                width: '80%',
                height: 10,
                style: { paddingLeft: 20, paddingRight: 20 },
              },
              {
                width: '100%',
                height: 230,
              },
            ]}
          />
        ))}
    </>
  );
};
