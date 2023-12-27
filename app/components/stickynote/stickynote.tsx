import Draggable from 'react-draggable';
import styled from 'styled-components';

const GenericNote = styled.div({
    position: "absolute",
    width: "200px",
    height: "200px",
    backgroundColor: "yellow",
    boxShadow: "5px 5px 7px rgba(33,33,33,.7)",
    padding: "16px",
    paddingTop: "30px",
    zIndex: 1000,
});
const Author = styled.div({
    paddingTop: "10px",
    fontFamily: "Lucida Handwriting",
});
const Quote = styled.div({
    fontFamily: "cursive",
});
const TextWrapper = styled.div({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
});

type StickyNoteProps = {
    quote: string;
    author?: string;
    color: string;
    xpos: number;
    ypos: number;
    zIndex: number;
};

export const StickyNote = ({quote, author = "", color, xpos = 0, ypos = 0, zIndex = 0}: StickyNoteProps) => {
    return(
        <Draggable>
            <GenericNote style={{
                backgroundColor: color,
                left: xpos,
                top: ypos,
                zIndex: zIndex,
            }}>
                <TextWrapper>
                <Quote>{quote}</Quote>
                <Author>{author ? `- ${author}` : ""}</Author>
                </TextWrapper>
            </GenericNote>
        </Draggable>
    )
};