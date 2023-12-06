"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { FlashCard } from "../components/flashcards/flashcard";
import { styled } from 'styled-components';
import { tokiPonaList } from "../constants/toki-pona-list";

const AnswerInput = styled.input({
    fontSize: "24px",
    color: "black",
    marginTop: "20px",
    width: "400px",
});

const ButtonWrapper = styled.div({
    width: "400px",
    display: "grid",
    gridGap: "20px",
    gridTemplateColumns: "1fr 2fr 1fr",
    justifyContent: "space-between",
    marginTop: "20px",
});

const CardWrapper = styled.div({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    width: "100vw",
});

const StyledButton = styled.button({
    backgroundColor: "#3f51b5",
    borderRadius: "5px",
    boxShadow: "0px 2px 2px lightgray",
    color: "white",
    cursor: "pointer",
    margin: "auto",
    outline: 0,
    padding: "5px 15px",
    textTransform: "uppercase",
    transition: "ease background-color 250ms",
    "&:hover": {
      backgroundColor: "#283593",
    },
    "&:disabled": {
      cursor: "default",
      opacity: 0.7,
    }
})


export default function About () {
    
    const [cardNumber, setCardNumber] = useState(0);
    const [corretlyAnswered, setCorrectlyAnswered] = useState(false);

    const TokiFlashcards = () => tokiPonaList.map((card) => 
        <FlashCard 
            key={card.front} 
            frontText={card.front} 
            backText={card.back} 
        />
    );

    const onNewCard = () => {
        setCorrectlyAnswered(false);
    };

    const previousFlashcard = () => {
        onNewCard();
        if (cardNumber > 0) {
            setCardNumber(cardNumber - 1);
        } else {
            setCardNumber(tokiPonaList.length - 1);
        }
    };

    const randomFlashcard = () => {
        onNewCard();
        const getRandomCardNumber = () => {
            const newCardNumber = Math.floor(Math.random() * tokiPonaList.length);
            if (cardNumber === newCardNumber) {
                return getRandomCardNumber();
            }
            return newCardNumber;
        }
        setCardNumber(getRandomCardNumber());
    };

    const nextFlashcard = () => {
        onNewCard();
        if (cardNumber < tokiPonaList.length - 1) {
            setCardNumber(cardNumber + 1);
        } else {
            setCardNumber(0);
        }
    }

    const checkInput = (event) => {
        console.log(event);
        if (event.target.value === tokiPonaList[cardNumber].back) {
            setCorrectlyAnswered(true);
        }
    };

    const CurrentFlashcard = TokiFlashcards()[cardNumber] as React.JSX.Element;

    return(
        <CardWrapper
            style={{
                backgroundColor: corretlyAnswered ? "green" : "",
            }}
        >
            {CurrentFlashcard}
            <AnswerInput type="text" onInput={checkInput} autoFocus={true} placeholder="English translation..."/>
            <ButtonWrapper>
                <StyledButton onClick={previousFlashcard}><ArrowLeft/></StyledButton>
                <StyledButton onClick={randomFlashcard}>Random</StyledButton>
                <StyledButton onClick={nextFlashcard}><ArrowRight/></StyledButton>
            </ButtonWrapper>
        </CardWrapper>
    )
}