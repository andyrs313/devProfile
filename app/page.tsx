"use client";

import React from 'react'
import Image from 'next/image'
import { styled } from 'styled-components';


const Main = styled.main({
  backgroundColor: "white",
  height: "calc(100vh - 174px)",
});

export default function Home() {

  return (
    <Main>
      <h2>Software Developer</h2>
      <div>
        {/* insert profile picture here */ }
        <Image
          src="/profile.png"
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>
    </Main>
  )
}
