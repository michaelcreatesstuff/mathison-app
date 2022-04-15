import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  position: relative;
  top: 80px;
  width: 100%;
  height: 100%;
  display: flex;
`;

const ChildContainer = styled.div`
  // fill rest of container
  flex: 1;
  margin: 0 5%;
  overflow-y: visible;
`;

const Layout = (props) => {
  const { children } = props;
  return (
    <LayoutContainer>
      <Sidebar />
      <ChildContainer>{children}</ChildContainer>
    </LayoutContainer>
  );
};

export default Layout;
