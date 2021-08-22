import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import { navigate } from 'gatsby';

const StyledButton = styled.button`
  border: none;
  font-size: 20px;
  background: transparent;
  color: white;
  &:hover {
    cursor: pointer;
    color: #999;
  }
`;

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 1rem;
  gap: 1rem;
`;

const StyledNavText = styled.h3`
  font-size: 2rem;
  margin 0;
`;

const StyledSegment = styled(Segment)`
  && {
    margin-bottom: 0;
  }
`;

const StyledBody = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export type NavProps = {
  children: JSX.Element;
};

const Nav = ({ children }: NavProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [tick, setTick] = React.useState<boolean>(false);
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    linkTO: string
  ) => {
    e.preventDefault();
    navigate(linkTO);
  };

  React.useEffect(() => {
    setTick(true);
  }, []);

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical={tick}
        visible={visible}
        width="thin"
      >
        <Menu.Item as="a" onClick={(e) => handleMenuClick(e, '/')}>
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={(e) => handleMenuClick(e, '/blogs')}>
          <Icon name="pencil alternate" />
          Blogs
        </Menu.Item>
        <Menu.Item as="a" onClick={(e) => handleMenuClick(e, '/about')}>
          <Icon name="group" />
          About Us
        </Menu.Item>
        <Menu.Item as="a" onClick={(e) => handleMenuClick(e, '/contact')}>
          <Icon name="mail" />
          Contact
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={visible}>
        <StyledSegment basic inverted>
          <StyledNav>
            <StyledButton onClick={() => setVisible((prev) => !prev)}>
              <FaBars />
            </StyledButton>
            <StyledNavText>My Amazing Blog Page</StyledNavText>
          </StyledNav>
        </StyledSegment>
        <StyledBody>{children}</StyledBody>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default Nav;
