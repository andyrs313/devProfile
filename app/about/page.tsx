"use client";

import React from "react";
import { styled } from "styled-components";


export default function About() {

    const Wrapper = styled.div({
        marginLeft: "auto",
        marginRight: "auto",
        minWidth: "360px",
        maxWidth: "800px",
    });
    const Link = styled.a({
        color: "#0070f3",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        }
    });
    return (
        <Wrapper>
            {`Hello! My name is Allen Anderson. I am a resident of Hudsonville, Michigan.`} <br/>
            {`I am a software developer with ${new Date().getFullYear() - 2014} years experience and I am currently looking for a job. I am proficient in JavaScript, TypeScript, React, Node.js, C#, and .NET.`} <br/>
            {`People over money.`} <br/>
            {`Laughter a virtue.`} <br/>
            {`I am also a you.`} <br/>
            <Link href="/Resume-Allen-Anderson.pdf" target="_blank">Click here to download my resume</Link>
        </Wrapper>
    );
};