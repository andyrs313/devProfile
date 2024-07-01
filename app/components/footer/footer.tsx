"use client";

import React from 'react';
import { styled } from 'styled-components';
import { Linkedin, GitHub, Phone, Send } from 'react-feather';


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

const IconWrapper = styled.a({
    margin: "0 10px",
    color: "#555",
    "&:hover": {
        color: "#777",
    }
});

export const Footer = () => {

    return (
        <StyledFooter>
            <IconWrapper href="https://www.linkedin.com/in/danielallenandersonjr/" target="_blank"><Linkedin size={24}/></IconWrapper>
            <IconWrapper href="https://github.com/andyrs313"><GitHub size={24}/></IconWrapper>
            <IconWrapper href="tel:+6163414482"><Phone size={24}/></IconWrapper>
            <IconWrapper href="mailto:dande313@gmail.com"><Send size={24}/></IconWrapper>
        </StyledFooter>
    )

};