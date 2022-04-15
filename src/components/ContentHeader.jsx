import React from 'react';
import styled from 'styled-components';
import { ReactComponent as searchIcon } from '../assets/searchIcon.svg';

const ContentHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000000;
`;

const Heading1 = styled.h1`
  font-weight: 700;
  font-size: 44px;
  line-height: 44px;
  letter-spacing: -1px;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 273px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 3px solid #000000;
  height: 60px;
`;
const SearchIconContainer = styled(searchIcon)`
  margin-right: 24px;
`;
const SearchTextContainer = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
`;

const ContentHeader = (props) => {
  const { attributes = {} } = props;
  return (
    <ContentHeaderContainer>
      <Heading1>{attributes?.title}</Heading1>
          {/* TBD turn this into an actual input form */}
      <SearchContainer>
        <SearchIconContainer />
        <SearchTextContainer>Search</SearchTextContainer>
      </SearchContainer>
    </ContentHeaderContainer>
  );
};

export default ContentHeader;
