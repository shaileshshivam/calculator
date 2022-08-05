
import { useState } from 'react'
import { Plus, Minus, Divide, X, Percentage, SquareRoot, Equal, ArrowNarrowLeft } from 'tabler-icons-react';
import { motion } from "framer-motion"

import { computeOperationResult, isEmpty, withInDisplayLimit } from "./utils"
import { OPERATION, ZERO, POINT, DISPLAY_LIMIT } from './constant'

import "./App.css"




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

function App() {

  const [operationHistory, setOperationHistory] = useState([])
  const [currentNumber, setCurrentNumber] = useState("")
  const [isReal, setIsReal] = useState(false)
  const [invalidOperation, setInvalidOperation] = useState(false);
  const [hasComputedResult, setHasComputedResult] = useState(false)
  const [isCoverClosed, setIsCoverClose] = useState(false);

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


  function onCoverClick() {
    if (isCoverClosed) {
      onClear();
    }
    setIsCoverClose((isCoverClosed) => !isCoverClosed)
  }

  function setErrorState() {
    setInvalidOperation(true);
    setCurrentNumber("")
    setOperationHistory([])
  }

  function clearOperationConstraints() {
    setCurrentNumber("")
    setIsReal(false)
    setHasComputedResult(false)
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

  return (
    <div className="app-container">
      <div className="container">
        <motion.div
          className="cover"
          layout
          style={{ top: !isCoverClosed ? "-0.5rem" : "-112%" }}
          onClick={onCoverClick}
        >
        </motion.div>
        <div className="display">
          <div className="operation-history">
            {
              [...operationHistory, currentNumber].join(" ")
            }
          </div>
          <div className="current-number" style={{ fontSize: currentNumber.length <= DISPLAY_LIMIT ? "2rem" : "1.25rem" }}>
            {invalidOperation ? <span className="invalid-msg">invalid operation</span> : currentNumber}
          </div>
        </div>

        <div className="numpad-container">

          <button key="c" className="operation" style={{ backgroundColor: "#ff4828ba" }} onClick={onClear}>c</button>
          <button key="square-root" className="operation" onClick={onSquareRoot}><SquareRoot {...iconProps} /></button>
          <button key="modulo" className="operation" onClick={onOperationClick(OPERATION.PERCENT)}><Percentage {...iconProps} /></button>
          <button key="back-arrow" className="operation" onClick={onClearChar}><ArrowNarrowLeft {...iconProps} /></button>

          <div className="digits-container">
            {
              numbers.map(num => <button key={num} className="digit" onClick={onDigitClick(num)}>{num}</button>)
            }
            <button className="digit" onClick={onZeroClick}>{ZERO}</button>
            <button className="digit" onClick={onPointClick}>.</button>
            {
              <button className="operation" onClick={onResultClick}><Equal {...iconProps} /></button>
            }
          </div>

          <div className="operations-container">
            <button key={OPERATION.MINUS} className="operation" onClick={onMinus}>
              <Minus {...iconProps} />
            </button>
            {
              basicOperations.map(({ icon, label }) => <button key={label} className="operation" onClick={onOperationClick(label)}>{icon}</button>)
            }
          </div>

        </div>
      </div >
    </div>
  );
}

export default App;
