import { SkeletonLoadingComponent } from '@/presentation/components';

export const InformativeContentsLoading: React.FC = () => {
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
                height: 210,
                radius: 10,
                style: { marginBottom: 20, paddingTop: 25 },
              },
            ]}
            show={true}
          />
        ))}
    </>
  );
};
