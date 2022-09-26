import { ContentBlock } from '@/@types/content-block';
import { useEffect, useState } from 'react';
import {
  Container,
  ContainerImage,
  Image,
  ListContainer,
  ListItemContainer,
  Caption,
  Ordered,
  Unordered,
  LinkContainer,
  LinkImage,
  LinkContentContainer,
  LinkName,
  LinkDescription,
} from './styles';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';
import { ContentLoadingComponent } from './content-loading-component';

export interface ContentComponentProps {
  content: ContentBlock;
  isLoading: boolean;
}

export const ContentComponent: React.FC<ContentComponentProps> = ({
  content,
  isLoading,
}) => {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const [formatedContents, setFormatedContents] = useState<
    Array<JSX.Element | null>
  >([]);

  const formatContent = () => {
    const formatText = (text: string) => text.replace(/\n|<br>/g, '');
    const renderText = (text: string, id: string | number) => (
      <RenderHtml
        key={id}
        systemFonts={Object.values(theme.fonts.families)}
        baseStyle={{
          fontFamily: theme.fonts.families.regular,
          fontSize: theme.fonts.sizes.sm,
          lineHeight: 20,
          color: theme.colors.body,
          marginBottom: 10,
        }}
        tagsStyles={{
          a: {
            color: theme.colors.primary,
          },
          h2: {
            color: theme.colors.secondary,
            fontSize: theme.fonts.sizes.lg,
            fontFamily: theme.fonts.families.bold,
            margin: '15px 0 5px 0',
          },
          h3: {
            color: theme.colors.secondary,
            margin: '15px 0 5px 0',
            fontSize: theme.fonts.sizes.md,
            fontFamily: theme.fonts.families.bold,
          },
        }}
        contentWidth={width}
        source={{
          html: text,
        }}
      />
    );

    return content.blocks.map((element) => {
      switch (element.type) {
        case 'header': {
          const h = `h${element.data.level}`;
          return renderText(`<${h}>${element.data.text}</${h}>`, element.id);
        }
        case 'paragraph': {
          return renderText(element.data.text, element.id);
        }
        case 'LinkTool': {
          return (
            <LinkContainer key={element.id} style={{ ...theme.shadows.sm }}>
              {element.data.meta.image.url ? (
                <LinkImage
                  source={{ uri: element.data.meta.image.url }}
                  resizeMode="cover"
                />
              ) : null}
              <LinkContentContainer>
                <LinkName>{element.data.meta.title}</LinkName>
                <LinkDescription>
                  {element.data.meta.description}
                </LinkDescription>
              </LinkContentContainer>
            </LinkContainer>
          );
        }
        case 'image': {
          return (
            <ContainerImage key={element.id}>
              <Image
                source={{
                  uri: `${process.env.API_BASE_URL}${element.data.file.url}`,
                }}
                resizeMode="cover"
              />
              <Caption>{formatText(element.data.caption)}</Caption>
            </ContainerImage>
          );
        }
        case 'list': {
          return (
            <ListContainer key={element.id}>
              {element.data.items.map((item, index) => (
                <ListItemContainer key={index}>
                  {element.data.style === 'ordered' ? (
                    <Ordered>{index + 1}.</Ordered>
                  ) : (
                    <Unordered />
                  )}
                  {renderText(item, index)}
                </ListItemContainer>
              ))}
            </ListContainer>
          );
        }
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    if (!content) return;
    setFormatedContents(formatContent() || []);
  }, [content]);

  return isLoading ? (
    <ContentLoadingComponent />
  ) : (
    <Container>{formatedContents}</Container>
  );
};
