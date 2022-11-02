import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { ModalState } from '@/presentation/@types/generics';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  Container,
  bottomSheetStyles,
  Title,
  Description,
  ContainerContent,
  ItemTitle,
  ItemDescription,
  ContainerItem,
  ItemImage,
  styles,
} from './styles';
import { SpecieModel } from '@/domain/models';
import {
  ButtonComponent,
  EmptyContentComponent,
  SearchInputComponent,
} from '@/presentation/components';
import { ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components';
import { useDebounce } from '@/presentation/hooks';
import { SpeciesLoadingComponent } from './species-loading-component';

export interface BackdropSelectSpecieProps {
  modalState: ModalState;
  species: SpecieModel[];
  loading: boolean;
  haveSelected: boolean;
  onClose?: (closeState: ModalState) => void;
  onSubmit?: (search: string, page: number) => void;
  onSelect?: (specie: SpecieModel | null) => void;
}

export const BackdropSelectSpecieComponent: React.FC<
  BackdropSelectSpecieProps
> = ({
  modalState,
  species,
  loading,
  haveSelected,
  onClose = () => null,
  onSubmit = () => null,
  onSelect = () => null,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchDebounce = useDebounce<string>(search || '', 500);
  const snapPoints = useMemo(() => ['50%', '85%'], []);
  const theme = useTheme();

  const isOpen = () => modalState === ModalState.open;

  const handleClose = useCallback(() => {
    onClose(ModalState.close);
  }, []);

  const renderItem: ListRenderItem<SpecieModel> = useCallback(
    ({ item }) => (
      <ContainerItem
        key={item.id}
        delayLongPress={0}
        onPress={() => onSelect(item)}
        style={{
          ...theme.shadows.sm,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
        }}
      >
        <ContainerContent>
          <ItemTitle>{item.name}</ItemTitle>
          <ItemDescription>{item.description}</ItemDescription>
        </ContainerContent>
        <ItemImage source={{ uri: item.image }} />
      </ContainerItem>
    ),
    []
  );

  useEffect(() => {
    setCurrentPage(1);
    onSubmit(search, 1);
  }, [searchDebounce]);

  useEffect(() => {
    if (isOpen()) {
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [modalState]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      onClose={handleClose}
      containerStyle={{
        backgroundColor: isOpen() ? '#00000040' : 'transparent',
      }}
      handleIndicatorStyle={bottomSheetStyles.indicator}
    >
      <BottomSheetView style={bottomSheetStyles.bottomSheetScrollView}>
        <Container style={styles.noPaddingY}>
          <Title>Selecione a espécie</Title>
          <Description>
            Essa seleção é opcional e você pode mudar a qualquer momento
          </Description>
          <SearchInputComponent
            style={styles.search}
            titleFontSize="lg"
            onSubmit={setSearch}
            placeholder="Encontre pelo nome da espécie"
            infoMessage="Ex: Girassol Arranha-Céu,  Girassol Gigante Americano..."
          />
        </Container>
      </BottomSheetView>
      {loading ? (
        <SpeciesLoadingComponent />
      ) : !loading && !species.length ? (
        <EmptyContentComponent
          style={styles.empty}
          description="Oops! Não encontramos espécies com esse nome :("
        />
      ) : (
        <BottomSheetFlatList
          data={species}
          renderItem={renderItem}
          initialNumToRender={4}
          extraData={species}
          keyExtractor={(_, i) => String(i)}
          onEndReached={() => {
            const page = currentPage + 1;
            setCurrentPage(page);
            onSubmit(search, page);
          }}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
      {haveSelected ? (
        <ButtonComponent
          style={styles.buttonRemoveSelection}
          type="outline"
          onPress={() => onSelect(null)}
        >
          Remover seleção
        </ButtonComponent>
      ) : null}
    </BottomSheet>
  );
};
