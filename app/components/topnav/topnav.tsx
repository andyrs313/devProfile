"use client";

import React from "react";
import DropdownMenu from "../dropdownMenu/dropdownMenu";
import { styled } from 'styled-components';


const Nav = styled.nav({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D4e6f2",
});
const NavButton = styled.a({
    //align text in horizontal and vertical center of element
    alignItems: "center",
    backgroundColor: "#D4e6f2",
    borderLeft: "2px solid #d3d3d8",
    display: "flex",
    height: "74px",
    justifyContent: "center",
    minWidth: "100px",
    padding: "20px",
    "&:hover": {
        backgroundColor: "#e0e0e0",
    },
});   
const NavButtonWrapper = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}); 
const Name = styled.h1({
    margin: 0,
    fontSize: "36px",
    padding: "10px",
});

export const TopNav = () => {
    return (
        <Nav>
            <Name>D. Allen Anderson</Name>
            <NavButtonWrapper>
                <NavButton href="/">Home</NavButton>
                <DropdownMenu>Projects</DropdownMenu>
                <NavButton href="/about">About</NavButton>
            </NavButtonWrapper>
        </Nav>
    );
    

        

    
};