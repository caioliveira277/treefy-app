import { StyleProp, ViewStyle } from 'react-native';
import { Container, Title, Description, TextBold, styles } from './styles';
import { RowMap, SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { UserPlantModel } from '@/domain/models';
import React, { useEffect, useState } from 'react';
import { NextCareLoadingComponent } from './next-care-loading-component';
import { EmptyContentComponent } from '@/presentation/components';
import { ItemComponent } from './item-component';
import { ModalState, MyGardenItem } from '@/presentation/@types/generics';
import { HiddenItemComponent } from './hidden-item-component';
import { BackdropDeleteConfirmComponent } from './backdrop-delete-confirm';

export interface NextCareComponentProps {
  style?: StyleProp<ViewStyle>;
  plants: UserPlantModel[];
  onFinish?: (selectedPlant: UserPlantModel) => void;
  onEdit?: (selectedPlant: UserPlantModel) => void;
  onDelete?: (selectedPlant: UserPlantModel) => void;
  loading: boolean;
}

export const NextCareComponent: React.FC<NextCareComponentProps> = ({
  style,
  plants,
  loading,
  onFinish = () => null,
  onEdit = () => null,
  onDelete = () => null,
}) => {
  const [list, setList] = useState<MyGardenItem[]>([]);
  const [confirmDeleteItem, setConfirmDeleteItem] =
    useState<null | MyGardenItem>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(ModalState.close);

  const params = {
    finish: -75,
    edit: 75,
  };

  const getFormatedList = (plantList: UserPlantModel[]): MyGardenItem[] => {
    const result: MyGardenItem[] = [];

    plantList.forEach((plant, i) => {
      if (plant.sunRange) result.push({ ...plant, type: 'sun', key: i });

      if (plant.waterRange)
        result.push({ ...plant, type: 'water', key: i + 1 });

      if (!plant.waterRange && !plant.sunRange)
        result.push({ ...plant, type: 'incompleted', key: i + 1 });
    });

    return result;
  };

  const handleOpenRow = (
    rowKey: string,
    rowMap: RowMap<MyGardenItem>,
    toValue: number
  ) => {
    if (!rowMap[rowKey]) return;

    rowMap[rowKey].closeRow();
    const item = rowMap[rowKey].props.item;

    if (params.finish === toValue) {
      onFinish(item as UserPlantModel);
    } else {
      onEdit(item as UserPlantModel);
    }
  };

  const handleDeleteItem = (item: MyGardenItem) => {
    setConfirmDeleteItem(item);
    setOpenConfirmDelete(ModalState.open);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteItem(null);
    setOpenConfirmDelete(ModalState.close);
  };

  useEffect(() => {
    setList(getFormatedList(plants));
  }, [plants]);

  return (
    <>
      <Container style={style}>
        <Title>Próximos cuidados:</Title>
        <Description>
          Arraste para o lado <TextBold>esquerdo</TextBold> para{' '}
          <TextBold>concluir</TextBold> e para o lado{' '}
          <TextBold>direto</TextBold> para <TextBold>editar</TextBold>. {'\n'}
          Caso queira <TextBold>excluir</TextBold>, pressione e segure o item
          desejado.
        </Description>
        {loading ? (
          <NextCareLoadingComponent />
        ) : !loading && !plants.length ? (
          <Container style={styles.empty}>
            <EmptyContentComponent description="Oops! Você ainda não cadastrou nenhuma planta :(" />
          </Container>
        ) : (
          <SwipeListView
            data={list}
            renderItem={(props) => (
              <SwipeRow
                disableLeftSwipe={props.item.type === 'incompleted'}
                stopLeftSwipe={params.edit}
                leftOpenValue={params.edit}
                stopRightSwipe={params.finish}
                rightOpenValue={params.finish}
                item={props.item}
              >
                <HiddenItemComponent />
                <ItemComponent
                  {...props}
                  onLongPress={() => handleDeleteItem(props.item)}
                />
              </SwipeRow>
            )}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={styles.containerStyle}
            onRowDidOpen={handleOpenRow}
          />
        )}
      </Container>
      <BackdropDeleteConfirmComponent
        modalState={openConfirmDelete}
        item={confirmDeleteItem}
        onClose={handleCloseConfirmDelete}
        onConfirm={(item) => {
          onDelete(item);
          handleCloseConfirmDelete();
        }}
      />
    </>
  );
};
