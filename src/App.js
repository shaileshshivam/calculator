
import { useState } from 'react'
import styled from 'styled-components';

import Cover from './Cover';
import Display from './Display';
import Numpad from './Numpad';

const Container = styled.div`
  min-height: 100vh;
  min-width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
`

const Calculator = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 24rem;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border-radius: 0.5rem;
`

function App() {

  const [operationHistory, setOperationHistory] = useState([])
  const [currentNumber, setCurrentNumber] = useState("0")
  const [invalidOperation, setInvalidOperation] = useState(false);

  return (
    <Container>
      <Calculator>
        <Cover />
        <Display currentNumber={currentNumber} operationHistory={operationHistory} isInvalidOperation={invalidOperation} />
        <Numpad
          operationHistory={operationHistory}
          currentNumber={currentNumber}
          setOperationHistory={setOperationHistory}
          setCurrentNumber={setCurrentNumber}
          setInvalidOperation={setInvalidOperation}
        />
      </Calculator >
    </Container>
  );
}

export default App;
