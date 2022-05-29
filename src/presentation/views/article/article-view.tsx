import React from 'react';
import { Text } from 'react-native';
import { ArticleViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';

export interface ArticleViewProps
  extends NativeStackScreenProps<StackParamList, 'Article'> {
  helpViewModel: ArticleViewModel;
}

export class ArticleView
  extends React.Component<ArticleViewProps>
  implements BaseView<ArticleViewProps>
{
  private helpViewModel: ArticleViewModel;

  constructor(props: ArticleViewProps) {
    super(props);

    const { helpViewModel } = this.props;
    this.helpViewModel = helpViewModel;
  }

  public componentDidMount(): void {
    this.helpViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.helpViewModel.detachView();
  }

  public onViewModelChanged(): void {}

  render() {
    return <Text>Teste</Text>;
  }
}
