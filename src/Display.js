import styled from "styled-components"
import { DISPLAY_LIMIT } from "./constant"

const StyledDisplay = styled.div`
    position: relative;
    user-select: none;
    padding: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    text-align: right;
    border-radius: 0.5rem;

    border: 1px solid whitesmoke;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    background-color: #c0dbb0;
    /* background-color: #424244; */
    color: #322323;
    font-family: 'PT Mono', monospace;
`

const OperationHistory = styled.span`
    display:block;
    font-size: small;
    min-height: 2rem;
    user-select: none;
`

const CurrentNumber = styled.span`
    display:block;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    text-align: right;
    letter-spacing: 2px;
    font-size: ${(props) => props.isNumberWiderThanDisplay ? "2rem" : `${props.scaledFontSize}rem`}
`

const ErrorMessage = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ff8282;
    background-color: #322323;
    border-radius: 0.5rem;
`

export default function Display({ currentNumber, operationHistory, isInvalidOperation }) {

    const scaledFontSize = (DISPLAY_LIMIT / currentNumber.length) * 2
    const isNumberWiderThanDisplay = currentNumber.length <= DISPLAY_LIMIT

    return <StyledDisplay>
        <OperationHistory>
            {
                [...operationHistory, currentNumber].join(" ")
            }
        </OperationHistory>
        <CurrentNumber isNumberWiderThanDisplay={isNumberWiderThanDisplay} scaledFontSize={scaledFontSize}>
            {
                isInvalidOperation ?
                    <ErrorMessage>invalid operation</ErrorMessage> :
                    currentNumber
            }
        </CurrentNumber>
    </StyledDisplay>
}