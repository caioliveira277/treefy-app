import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
`;

// category
export const CategoryContainer = styled.View`
  justify-content: flex-start;
  width: 120px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.families.regular};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 3px;
`;

export const CategoryListContainer = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CategoryItemContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const CategoryItem = styled(Label)`
  color: ${({ theme }) => theme.colors.primary};
  align-items: center;
`;

export const Point = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 3px;
  height: 3px;
  border-radius: 6px;
  margin: 0 5px;
`;

// rate
export const RateContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  margin: 0 10px;
`;

export const RateIcon = styled.Image`
  width: 12px;
  height: 12px;
  margin-right: 5px;
`;

export const RateText = styled(Label)`
  color: ${({ theme }) => theme.colors.rate_active};
`;

// date
export const DateContainer = styled.View`
  width: 120px;
  align-items: flex-end;
`;

export const DateIconTextContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const DateIcon = styled.Image`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;

export const DateText = styled(Label)``;
