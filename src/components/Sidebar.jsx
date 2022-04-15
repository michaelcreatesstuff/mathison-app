import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 351px;
  border: 1px solid #E5E5E5;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: #000000;
`;

const TextContainer = styled.div`
  margin: 56px 0 0 24px;
`;

const SidebarHeading = styled.div`
  margin-bottom: 20px;
`;

const InternalLink = styled(Link)`
  border: none;
  outline: none;
  text-decoration: none;
  color: #050b0e;
  outline-color: #050b0e;
  font-weight: ${(props) => (props.ispath === 'true' ? '700' : '400')};
  white-space: nowrap;
`;

const ExternalLink = styled.a`
  border: none;
  outline: none;
  text-decoration: none;
  color: #050b0e;
  outline-color: #050b0e;
  white-space: nowrap;
`;

const SubHeadingContainer = styled.div`
  margin-left: 18px;
`;
const SidebarSubHeading = styled.div`
  margin-bottom: 20px;
`;

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <SidebarContainer>
      <TextContainer>
        <SidebarHeading>
          <InternalLink
            to="/knowledge-center/categories"
            ispath={pathname === '/knowledge-center/categories' ? 'true' : undefined}
          >
            Categories
          </InternalLink>
        </SidebarHeading>
        <SubHeadingContainer>
          <SidebarSubHeading>
            <InternalLink
              to="/knowledge-center/defining_and_tracking_dei"
              ispath={
                pathname === '/knowledge-center/defining_and_tracking_dei' ? 'true' : undefined
              }
            >
              Defining & Tracking DEI
            </InternalLink>
          </SidebarSubHeading>
          <SidebarSubHeading>
            <InternalLink
              to="/knowledge-center/sourcing_and_attracting"
              ispath={pathname === '/knowledge-center/sourcing_and_attracting' ? 'true' : undefined}
            >
              Sourcing & Attracting
            </InternalLink>
          </SidebarSubHeading>
          <SidebarSubHeading>
            <InternalLink
              to="/knowledge-center/interviewing_and_engaging"
              ispath={
                pathname === '/knowledge-center/interviewing_and_engaging' ? 'true' : undefined
              }
            >
              Interviewing & Engaging
            </InternalLink>
          </SidebarSubHeading>
          <SidebarSubHeading>
            <InternalLink
              to="/knowledge-center/onboarding_and_advancing"
              ispath={
                pathname === '/knowledge-center/onboarding_and_advancing' ? 'true' : undefined
              }
            >
              Onboarding & Advancing
            </InternalLink>
          </SidebarSubHeading>
        </SubHeadingContainer>
        <SidebarHeading>
          <InternalLink
            to="/knowledge-center/growing_dei_leaders"
            ispath={pathname === '/knowledge-center/growing_dei_leaders' ? 'true' : undefined}
          >
            Growing DEI leaders
          </InternalLink>
        </SidebarHeading>
        <SidebarHeading>
          <InternalLink
            to="/knowledge-center/hiring_for_diversity"
            ispath={pathname === '/knowledge-center/hiring_for_diversity' ? 'true' : undefined}
          >
            Book: Hiring for Diversity
          </InternalLink>
        </SidebarHeading>
        <SidebarHeading>Diverse Communities</SidebarHeading>
        <SidebarHeading>Hiring Managers</SidebarHeading>
        <SidebarHeading>Glossary of Terms</SidebarHeading>
      </TextContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
