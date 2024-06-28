"use client";

import React from 'react'
import Image from 'next/image'
import { styled } from 'styled-components';
import { StickyNote } from '../app/components/stickynote/stickynote';
import { sellingPoints } from './constants/sellingPoints';
import { useState } from 'react';
import '@radix-ui/themes/styles.css';


const Main = styled.main({
  backgroundColor: "white",
  height: "calc(100vh - 174px)",
});

const ImageWrapper = styled.div({
  position: "absolute",
  right: "0",
  bottom: "100px",
});


const StickyNotes = () => {
  const [topZIndex, setTopZIndex] = useState(0);

  return (
    <div>
      {sellingPoints.map((quote, index) => {
        return (
          <StickyNote
            quote={quote.quote}
            color={quote.color}
            xpos={quote.xPos}
            ypos={quote.yPos}
            zIndex={quote.zIndex}
            key={index}
            onClick={() => {
              setTopZIndex(topZIndex ? topZIndex + 1 : sellingPoints.length + 1);
            }}
            topZIndex = {topZIndex}
          />
        )
      })}
    </div>
  );
}



export default function Home() {

  return (
    <Main>
      <StickyNotes />
      <ImageWrapper>
        <Image
          src="/profile.png"
          alt="Picture of the author"
          width={700}
          height={700}
        />
      </ImageWrapper>
    </Main>
  )
}
