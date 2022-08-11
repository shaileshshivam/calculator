
import { useState } from 'react'
import { Plus, Minus, Divide, X, Percentage, SquareRoot, Equal, ArrowNarrowLeft } from 'tabler-icons-react';
import styled from 'styled-components';

import { computeOperationResult, isEmpty, withInDisplayLimit } from "./utils"
import { OPERATION, ZERO, POINT } from './constant'


const iconProps = {
    strokeWidth: 2,
    size: 32
}


const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3"]


const basicOperations = [
    {
        icon: <Plus {...iconProps} />,
        label: OPERATION.PLUS
    },
    {
        icon: <X {...iconProps} />,
        label: OPERATION.MULTIPLY
    },
    {
        icon: <Divide {...iconProps} />,
        label: OPERATION.DIVIDE
    }
]

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 1rem;
    row-gap: 1.25rem;
`

const BasicOperationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    column-gap: 1rem;
    row-gap: 1.25rem;
`

const DigitsContainer = styled.div`
    grid-column: 1 / 4;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1rem;
    row-gap: 1.25rem;
`

const ButtonBase = styled.button`
    background: none;
    border: none;
    outline: none;
    font-size: 2rem;
    width: 100 %;
    text-align: center;
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
    user-select: none;
    cursor: pointer;
    align-self: center;
    justify-self: center;
    border-radius: 0.75rem;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

        &:active {
        transform: scale(0.99);
        transition: all 0.2s ease -in;
    }
`
const Operator = styled(ButtonBase)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    background-color: #7e73ab;
    color: whitesmoke;
`

const Clear = styled(Operator)`
    background-color: #ff4828ba;
`
const Digit = styled(ButtonBase)`
    background-color: #0f123570;
    color: white;
`



export default function Numpad({ operationHistory, currentNumber, setCurrentNumber, setInvalidOperation, setOperationHistory }) {

    const [isReal, setIsReal] = useState(false)
    const [hasComputedResult, setHasComputedResult] = useState(false)


    function clearOperationConstraints() {
        setCurrentNumber("")
        setIsReal(false)
        setHasComputedResult(false)
    }

    function onDigitClick(digit) {
        return function onClick() {

            if (hasComputedResult || isEmpty(currentNumber)) {
                setCurrentNumber(digit)
                setHasComputedResult(false)
                return
            }

            if (withInDisplayLimit(currentNumber)) {
                setCurrentNumber((num) => num + digit)
            }
        }
    }


    function setErrorState() {
        setInvalidOperation(true);
        setCurrentNumber("")
        setOperationHistory([])
    }

    function onZeroClick() {
        if (withInDisplayLimit(currentNumber)) {

            if (!isReal && currentNumber.startsWith(ZERO)) {
                return
            }

            if (hasComputedResult) {
                setCurrentNumber(ZERO)
                setHasComputedResult(false)
            } else {
                setCurrentNumber((num) => num + ZERO)
            }
        }
    }

    function onSquareRoot() {
        if (isEmpty(currentNumber)) {
            return
        }

        const operationResult = computeOperationResult([...operationHistory, currentNumber])

        if (operationResult < 0) {
            setErrorState()
            return
        }

        const squareRoot = Math.sqrt(operationResult).toFixed(2)
        setCurrentNumber(squareRoot)
        setOperationHistory([])
        setHasComputedResult(true);
    }

    function onMinus() {
        if (isEmpty(currentNumber)) {
            setCurrentNumber(OPERATION.MINUS)
        } else if (currentNumber.length === 1 && currentNumber === OPERATION.MINUS) {
            onClearChar();
        } else {
            setOperationHistory((history) => [...history, currentNumber, OPERATION.MINUS])
            clearOperationConstraints();
        }
    }

    function onClear() {
        clearOperationConstraints();
        setInvalidOperation(false)
        setOperationHistory([])
    }

    function onClearChar() {
        if (!isEmpty(currentNumber) && !hasComputedResult) {
            setCurrentNumber((num) => num.slice(0, num.length - 1))
        }
    }

    function onPointClick() {
        if (withInDisplayLimit(currentNumber)) {
            if (!isReal) {
                if (isEmpty(currentNumber) || hasComputedResult) {
                    setCurrentNumber(`${ZERO}${POINT}`)
                    setHasComputedResult(false)
                } else {
                    setCurrentNumber((num) => num + POINT)
                }
                setIsReal(true)
            }
        }
    }

    function onOperationClick(operation) {
        return function onClick() {
            if (isEmpty(currentNumber)) {
                return
            }

            setOperationHistory((history) => [...history, currentNumber, operation])
            clearOperationConstraints();
        }
    }

    function onResultClick() {
        const operationHistoryWithCurrentInput = [...operationHistory, currentNumber];
        let operationResult;

        try {
            operationResult = computeOperationResult(operationHistoryWithCurrentInput)
        } catch (e) {
            setErrorState();
            return;
        }

        operationResult = Number.isInteger(operationResult) ?
            operationResult.toString() :
            operationResult.toFixed(2).toString()

        setCurrentNumber(operationResult);
        setOperationHistory([])
        setHasComputedResult(true)
    }


    return <Container>

        <Clear onClick={onClear}>c</Clear>
        <Operator onClick={onSquareRoot}>
            <SquareRoot {...iconProps} />
        </Operator>
        <Operator onClick={onOperationClick(OPERATION.PERCENT)}>
            <Percentage {...iconProps} />
        </Operator>
        <Operator onClick={onClearChar}>
            <ArrowNarrowLeft {...iconProps} />
        </Operator>

        <DigitsContainer>
            {
                numbers.map(num => <Digit key={num} onClick={onDigitClick(num)}>{num}</Digit>)
            }
            <Digit onClick={onZeroClick}>{ZERO}</Digit>
            <Digit onClick={onPointClick}>{POINT}</Digit>
            <Operator onClick={onResultClick}>
                <Equal {...iconProps} />
            </Operator>
        </DigitsContainer>

        <BasicOperationsContainer>
            <Operator onClick={onMinus}>
                <Minus {...iconProps} />
            </Operator>
            {
                basicOperations.map(({ icon, label }) => <Operator key={label} onClick={onOperationClick(label)}>{icon}</Operator>)
            }
        </BasicOperationsContainer>

    </Container>;
}