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
            {`I am a software developer with ${new Date().getFullYear() - 2017} years experience and I am currently looking for a career change. My ideal position would be in project leadership and management. I am passionate about people. I am proficient in JavaScript, TypeScript, React, Next.js, and Node. I can furnish referrals upon request.`} <br/>
            {`People over money.`} <br/>
            {`Laughter is a virtue.`} <br/>
            {`I am also a you.`} <br/>
            <Link href="/Resume-Allen-Anderson.pdf" target="_blank">Click here to download my resume</Link>
        </Wrapper>
    );
};