import React from 'react';
import { ArticleViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container, SafeContainer } from './styles';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';
import { RateComponent } from './components';

export interface ArticleViewProps
  extends NativeStackScreenProps<StackParamList, 'Article'> {
  articleViewModel: ArticleViewModel;
}

export interface ArticleViewState {
  webheight: number;
}

export class ArticleView
  extends React.Component<ArticleViewProps, ArticleViewState>
  implements BaseView
{
  private articleViewModel: ArticleViewModel;

  constructor(props: ArticleViewProps) {
    super(props);

    this.state = {
      webheight: Dimensions.get('window').height,
    };

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
            height: this.state.webheight,
          }}
          source={{
            uri: 'https://caioliveira277.github.io/todo-list/public/assets/temp/article-example.html',
          }}
          onMessage={(event) => {
            this.setState({
              webheight: parseInt(event.nativeEvent.data),
            });
          }}
          scrollEnabled={false}
          javaScriptEnabled={true}
          injectedJavaScript={`
              setTimeout(function() { 
                window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
              }, 500);
              true;
            `}
        />
        <SafeContainer>
          <RateComponent />
        </SafeContainer>
      </Container>
    );
  }
}
