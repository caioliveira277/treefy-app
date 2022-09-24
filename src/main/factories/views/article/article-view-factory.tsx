import { ArticleViewModelImpl } from '@/presentation/view-models';
import { ArticleView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteGetArticles } from '@/main/factories/usecases';

interface MakeArticleViewProps {
  route: RouteProp<StackParamList, 'Article'>;
  navigation: any;
}

export const makeArticleView: React.FC<MakeArticleViewProps> = (props) => {
  const articleViewModel = new ArticleViewModelImpl(makeRemoteGetArticles());

  return <ArticleView {...props} articleViewModel={articleViewModel} />;
};
