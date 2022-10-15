import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { ModalState } from '@/presentation/@types/generics';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
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
  EmptyContentComponent,
  SearchInputComponent,
} from '@/presentation/components';
import { FlatList, ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components';
import { useDebounce } from '@/presentation/hooks';
import Plant1Image from '@assets/images/plant1.png';
import { SpeciesLoadingComponent } from './species-loading-component';

export interface BackdropSelectSpecieProps {
  modalState: ModalState;
  species: SpecieModel[];
  loading: boolean;
  onClose?: (closeState: ModalState) => void;
  onSubmit?: (search: string) => void;
}

export const BackdropSelectSpecieComponent: React.FC<
  BackdropSelectSpecieProps
> = ({
  modalState,
  species,
  loading,
  onClose = () => null,
  onSubmit = () => null,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce<string>(search, 500);
  const snapPoints = useMemo(() => ['50%', '85%'], []);
  const theme = useTheme();

  const isOpen = () => modalState === ModalState.open;

  const handleClose = useCallback(() => {
    onClose(ModalState.close);
  }, []);

  useEffect(() => {
    onSubmit(search);
  }, [searchDebounce]);

  const renderItem: ListRenderItem<SpecieModel> = ({ item }) => (
    <ContainerItem
      key={item.id}
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
      <ItemImage source={Plant1Image} />
    </ContainerItem>
  );

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
        <Container style={styles.noPaddingX}>
          <Container style={styles.noPaddingY}>
            <Title>Selecione a espécie</Title>
            <Description>
              Essa seleção é opicinal e você pode mudar a qualquer momento
            </Description>
            <SearchInputComponent
              style={styles.search}
              titleFontSize="lg"
              onSubmit={setSearch}
              placeholder="Encontre pelo nome da espécie"
              infoMessage="Ex: Girassol Arranha-Céu,  Girassol Gigante Americano..."
            />
          </Container>
          {loading ? (
            <SpeciesLoadingComponent />
          ) : !loading && !species.length ? (
            <EmptyContentComponent
              style={styles.empty}
              description="Oops! Não encontramos espécies com esse nome :("
            />
          ) : (
            <FlatList data={species} renderItem={renderItem} />
          )}
        </Container>
      </BottomSheetView>
    </BottomSheet>
  );
};
