"use client";

import React from 'react';
import { styled } from 'styled-components';


const StyledFooter = styled.footer({
    position: "fixed",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    height: "100px",
    width: "100%",    
});

export const Footer = () => {

    return (
        <StyledFooter>
            <p>© 2023 D. Allen Anderson</p>
        </StyledFooter>
    )

};