import React from 'react';
import { ArticleViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container } from './styles';
import { WebView } from 'react-native-webview';

export interface ArticleViewProps
  extends NativeStackScreenProps<StackParamList, 'Article'> {
  articleViewModel: ArticleViewModel;
}

export class ArticleView
  extends React.Component<ArticleViewProps>
  implements BaseView<ArticleViewProps>
{
  private articleViewModel: ArticleViewModel;

  constructor(props: ArticleViewProps) {
    super(props);

    const { articleViewModel } = this.props;
    this.articleViewModel = articleViewModel;
  }

  public componentDidMount(): void {
    this.articleViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.articleViewModel.detachView();
  }

  public onViewModelChanged(): void {}

  render() {
    return (
      <Container>
        <WebView
          style={{
            flex: 1,
          }}
          source={{
            uri: 'https://caioliveira277.github.io/todo-list/public/assets/temp/article-example.html',
          }}
          scalesPageToFit={false}
        />
      </Container>
    );
  }
}
