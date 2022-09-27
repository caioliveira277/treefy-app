import { ArticleViewModelImpl } from '@/presentation/view-models';
import { ArticleView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import {
  makeRemoteCreateFeedbacks,
  makeRemoteGetArticles,
  makeRemoteGetFeedbacks,
} from '@/main/factories/usecases';
import { AuthenticationConsumer } from '@/presentation/contexts';

interface MakeArticleViewProps {
  route: RouteProp<StackParamList, 'Article'>;
  navigation: any;
}

export const makeArticleView: React.FC<MakeArticleViewProps> = (props) => {
  const articleViewModel = new ArticleViewModelImpl(
    makeRemoteGetArticles(),
    makeRemoteGetFeedbacks(),
    makeRemoteCreateFeedbacks()
  );

  return (
    <AuthenticationConsumer>
      {(authenticationContextParams) => (
        <ArticleView
          {...props}
          contextConsumer={authenticationContextParams}
          articleViewModel={articleViewModel}
        />
      )}
    </AuthenticationConsumer>
  );
};
