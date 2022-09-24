import { ContentBlock } from '@/@types/content-block';
import { useEffect, useState } from 'react';
import {
  Container,
  ContainerImage,
  Header,
  Image,
  ListContainer,
  ListItem,
  ListItemContainer,
  Paragraph,
  Caption,
  Ordered,
  Unordered,
} from './styles';

export interface ContentComponentProps {
  content: ContentBlock;
}

export const ContentComponent: React.FC<ContentComponentProps> = ({
  content,
}) => {
  const [formatedContents, setFormatedContents] = useState<
    Array<JSX.Element | null>
  >([]);

  const formatContent = () => {
    const formatText = (text: string) => text.replace(/\n|<br>/g, '');
    return content.blocks.map((element) => {
      switch (element.type) {
        case 'header': {
          return (
            <Header key={element.id}>{formatText(element.data.text)}</Header>
          );
        }
        case 'paragraph': {
          return (
            <Paragraph key={element.id}>
              {formatText(element.data.text)}
            </Paragraph>
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
                  <ListItem>{formatText(item)}</ListItem>
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

  return <Container>{formatedContents}</Container>;
};
