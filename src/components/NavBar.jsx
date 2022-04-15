import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as Mathison } from '../assets/Mathison.svg';
import { ReactComponent as Bell } from '../assets/bell.svg';
import { ReactComponent as Oval } from '../assets/oval.svg';
import navbarAvatar from '../assets/navbar-avatar.png';
import navbarConfig from '../config/navbarConfig.json';

const NavBarOuterContainer = styled.div`
  z-index: 1000;
  display: flex;
  height: 80px;
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(97, 116, 128, 0.12), 0px 4px 8px rgba(176, 186, 191, 0.12);
  font-size: 20px;
  line-height: 20px;
`;

const NavbarInnerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  // offset for box shadow
  margin-bottom: 2px;
`;

const NavbarLeft = styled.div`
  display: flex;
`;
const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5%;
`;

const BrandingContainer = styled.div`
  display: flex;
  align-items: center;
  //   screen size is 1920, or margin 0 104px 0 24px;
  // have media queries for different screen sizes or a different mockup
  margin: 0 104px 0 24px;
`;

const LogoContainer = styled(Logo)`
  margin-right: 10px;
`;

const MathisonContainer = styled(Mathison)``;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LinkContainer = styled.div`
  border-bottom: ${(props) => (props.ispath === 'true' ? '4px solid black' : '4px solid white')};
  height: 100%;
  display: flex;
  align-items: center;
  // screen size is 1920, or margin-right 30px;
  margin-right: 30px;
`;

const InternalLink = styled(Link)`
  border: none;
  outline: none;
  text-decoration: none;
  color: #050b0e;
  outline-color: #050b0e;
  font-weight: ${(props) => (props.ispath === 'true' ? '900' : '400')};
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

const ContactWrapper = styled.div`
  margin-right: 66px;
  color: #050b0e;
`;

const BellWrapper = styled.div`
  position: relative;
  margin-right: 16px;
`;

const BellContainer = styled(Bell)``;
const OvalContainer = styled(Oval)`
  position: absolute;
  left: 54.17%;
  right: 4.17%;
  top: 0%;
  bottom: 58.33%;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;

const AvatarText = styled.div`
  position: absolute;
  font-family: 'Roboto';
  font-size: 16px;
  color: #ffffff;
  position: absolute;
  width: 21px;
  height: 20px;
  left: 6px;
  top: 2px;
`;
const AvatarContainer = styled.img`
  width: 100%;
  height: 100%;
`;

const Branding = () => {
  return (
    <BrandingContainer>
      <LogoContainer />
      <MathisonContainer />
    </BrandingContainer>
  );
};

const NavbarLink = (props) => {
  const { item = {}, pathname = '/' } = props;
  return (
    <LinkContainer ispath={pathname.includes(item?.link) ? 'true' : undefined}>
      {item?.linkType === 'internal' ? (
        <InternalLink
          to={item?.link}
          ispath={pathname.includes(item?.routeIfActive) ? 'true' : undefined}
        >
          {item?.text}
        </InternalLink>
      ) : (
        <ExternalLink href={item?.link} alt={item?.text}>
          {item?.text}
        </ExternalLink>
      )}
    </LinkContainer>
  );
};

const NavbarLinks = (props) => {
  const { pathname = '/' } = props;
  return (
    <LinksContainer>
      {navbarConfig?.navbarLinks?.map((item) => (
        <NavbarLink key={item?.text} item={item} pathname={pathname} />
      ))}
    </LinksContainer>
  );
};

const NavBar = (props) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <NavBarOuterContainer>
      <NavbarInnerContainer>
        <NavbarLeft>
          <Branding />
          <NavbarLinks pathname={pathname} />
        </NavbarLeft>
        <NavbarRight>
          <ContactWrapper>Contact Us</ContactWrapper>
          <BellWrapper>
            <BellContainer />
            <OvalContainer />
          </BellWrapper>
          <AvatarWrapper>
            <AvatarContainer src={navbarAvatar} />
            <AvatarText>PD</AvatarText>
          </AvatarWrapper>
        </NavbarRight>
      </NavbarInnerContainer>
    </NavBarOuterContainer>
  );
};

export default NavBar;
