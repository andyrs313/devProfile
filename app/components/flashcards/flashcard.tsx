import React, { useState } from "react";
import ReactCardFlip from 'react-card-flip';
import { styled } from 'styled-components';;

const CardFace = styled.div({
    backgroundColor: "white",
    border: "1px solid black",
    color: "black",
    fontSize: "48px",
    height: "300px",
    lineHeight: "300px",
    textAlign: "center",
    width: "400px",

});


export const FlashCard = ({frontText, backText, fontSize = 48}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                <CardFace style={{fontSize: fontSize}} onClick={()=> setIsFlipped(!isFlipped)}>{frontText}</CardFace>
                <CardFace style={{fontSize: (fontSize / 2)}} onClick={()=> setIsFlipped(!isFlipped)}>{backText}</CardFace>
            </ReactCardFlip>
        </div>
    )
}