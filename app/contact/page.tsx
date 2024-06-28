"use client"
import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div({
    margin: "24px"
});

const Header = styled.div({
    fontSize: "30px",
    fontWeight: "bold"
});

export default function Contact() {

    return (
        <Wrapper>
            <Header>Contact</Header>
            <p>Address: 
                <a href="https://www.google.com/maps/place/Hudsonville,+MI+49426"> Wherever there is danger</a>
            </p>
            <p>Phone: 
                <a href="tel:+6163414482"> 616-341-4482</a>
            </p>
            <p>Email:
                <a href="mailto:dande313@gmail.com"> dande313@gmail.com</a>
            </p>
        </Wrapper>
    );
};