import styled from 'styled-components/native';
import * as HomeStyles from '../../styles';

export const Container = styled(HomeStyles.ContainerPadding)``;

export const Title = styled(HomeStyles.Title)`
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  margin-bottom: 10px;
`;

export const TransparentContainer = styled.View`
  padding-top: 25px;
`;

export const CardContainer = styled.TouchableOpacity`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const CardContainerColumnContent = styled.View`
  padding: 10px;
  flex: 1;
  margin-right: 5px;
`;

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  margin-bottom: 5px;
`;

export const CardDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.medium};
  color: ${({ theme }) => theme.colors.body};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  margin-bottom: 10px;
`;

export const CardAuthor = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 10px;
`;

export const CardCategoriesContainer = styled.View``;

export const CardCategoriesTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 5px;
`;

export const CardCategoriesItemsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardCategoriesItemWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardCategoriesItem = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

export const CardCategoriesItemPoint = styled.View`
  background: ${({ theme }) => theme.colors.body};
  width: 3px;
  height: 3px;
  border-radius: 6px;
  margin: 0 5px;
`;

export const CardContainerColumnImage = styled.View``;

export const CardImageBackground = styled.Image`
  width: 110px;
  height: 145px;
  border-top-right-radius: 10px;
`;

export const CardImage = styled.Image`
  width: 110px;
  height: 160px;
  position: absolute;
  top: -27px;
  right: 0;
  border-top-right-radius: 10px;
`;

export const CardEmptyContainer = styled.View`
  height: 210px;
  width: 100%;
  margin-top: 35px;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 40px;
`;
export const CardEmptyBackgroundImage = styled.Image`
  width: 100%;
  height: 210px;
  position: absolute;
`;
export const CardEmptyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 40px;
`;

export const CardFooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`;

export const CardFooterDateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardFooterIcon = styled.Image`
  margin-right: 5px;
  width: 12px;
  height: 12px;
`;

export const CardFooterDateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const CardFooterRateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardFooterRateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.families.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.rate_active};
`;
