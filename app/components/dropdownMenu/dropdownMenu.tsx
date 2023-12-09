
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { styled } from 'styled-components';


const Dropdown = styled.ul({
  position: "absolute",
  backgroundColor: "#D4e6f2",
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  minWidth: "160px",
  top: "74px",
  marginLeft: "100px",
  zIndex: 1,
  "& li": {
    backgroundColor: "#f0f0f0",
    display: "block",
    padding: "12px 16px",
    textDecoration: "none",
  },
  "& li:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const ChevronWrapper = styled.div({
  paddingLeft: "10px",
});

const NavButton = styled.button({
  //align text in horizontal and vertical center of element
  alignItems: "center",
  backgroundColor: "#D4e6f2",
  borderLeft: "2px solid #d3d3d8",
  display: "flex",
  height: "74px",
  padding: "20px",
  minWidth: "100px",
  "&:hover": {
      backgroundColor: "#e0e0e0",
  },
});

const DropdownMenu = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavButton className="dropdown-toggle" onClick={handleToggle}>
        {children} <ChevronWrapper>{isOpen ? <ChevronUp /> : <ChevronDown />}</ChevronWrapper>
      </NavButton>
      {isOpen && (
        <Dropdown className="dropdown-menu">
          <li>
            <a href="/toki">Toki Pono Flashcards</a>
          </li>
        </Dropdown>
      )}
    </>
  );
};

export default DropdownMenu;
