import {
  SkeletonLoadingComponent,
  SkeletonLoadingComponentProps,
} from '@/presentation/components';
import { customStyle } from './styles';

export const CategoriesLoading: React.FC = () => {
  const quantity = 3;
  const isLast = (index: number) => index + 1 === quantity;

  const getItems = (
    index: number
  ): SkeletonLoadingComponentProps['skeletons'] => {
    const items: SkeletonLoadingComponentProps['skeletons'] = [
      {
        width: 75,
        height: 75,
      },
      {
        width: 60,
        height: 10,
      },
    ];
    if (!index)
      items.push({
        width: 6,
        height: 6,
        radius: 12,
      });
    return items;
  };

  return (
    <>
      {Array(quantity)
        .fill('')
        .map((_, index) => (
          <SkeletonLoadingComponent
            key={index}
            skeletons={getItems(index)}
            show={true}
            containerStyle={[
              {
                alignItems: 'center',
              },
              isLast(index) ? customStyle.lastItem : customStyle.item,
            ]}
          />
        ))}
    </>
  );
};
