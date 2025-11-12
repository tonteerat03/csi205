import { useState, useRef } from 'react';

const Calculator = () => {
  // สถานะ
  const [screen, setScreen] = useState('0');
  const [lastOperator, setLastOperator] = useState('');
  const stateRef = useRef('s1'); // s1, s2, s3
  const operandRef = useRef(0);

  // คลิกตัวเลข
  const numberClicked = (number) => {
    if (stateRef.current === 's1') {
      setScreen(number.toString());
      stateRef.current = 's2';
    } else if (stateRef.current === 's2') {
      setScreen((prev) => (prev.length < 9 ? prev + number.toString() : prev));
    } else if (stateRef.current === 's3') {
      setScreen(number.toString());
      stateRef.current = 's2';
    }
  };

  // คลิก
  const operatorClicked = (operator) => {
    if (stateRef.current === 's2') {
      operandRef.current = parseFloat(screen);
      setLastOperator(operator);
      stateRef.current = 's3';
    } else if (stateRef.current === 's3') {
      setLastOperator(operator);
    }
  };

  // คลิก
  const equalClicked = () => {
    if (stateRef.current === 's2' || stateRef.current === 's3') {
      const current = parseFloat(screen);
      let result = 0;
      if (lastOperator === '+') result = operandRef.current + current;
      else if (lastOperator === '-') result = operandRef.current - current;
      else result = current;

      setScreen(result.toString());
      stateRef.current = 's1';
      operandRef.current = 0;
      setLastOperator('');
    }
  };

  // Handle CE
  const ceClicked = () => {
    setScreen('0');
    operandRef.current = 0;
    setLastOperator('');
    stateRef.current = 's1';
  };

  // ปุ่ม
  const plusClass = lastOperator === '+' ? 'btn btn-yellow' : 'btn btn-green';
  const minusClass = lastOperator === '-' ? 'btn btn-yellow' : 'btn btn-green';

  return (
    <>
      <style>{`
        /* Scoped and enlarged calculator styles */
        .cal-container * { margin:0; padding:0; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; }
        .cal-container { margin:1.5rem auto; border:18px solid rgb(43,43,43); border-radius:30px; width: fit-content; padding:0.75rem; background-color: rgb(210,204,204); font-size: 1.15rem; }
        .cal-container .cal-screen { border:1px solid black; text-align:right; background-color: rgb(179,236,255); padding:0.75rem 0.6rem; margin:0.8rem 0.25rem; border-radius:12px; min-width: 380px; font-size: 1.5rem; }
        /* Larger, more proportionate buttons */
        .cal-container .btn { width:3.6rem; height:3.6rem; margin:0.25rem; border-radius:0.35rem; border:none; cursor:pointer; font-size: 1rem; }
        .cal-container .btn-green { background-color: rgb(103,232,103); }
        .cal-container .btn-red { background-color: rgb(247,106,50); }
        .cal-container .btn-blue { background-color: rgb(97,177,223); }
        .cal-container .btn-yellow { background-color: rgb(239,239,156); }
        .cal-container .btn-active:hover { background-color: rgb(203,203,87); }
        .cal-container .btn-red.btn-active:hover { background-color: rgb(251,47,47); }

        /* Responsive: scale down on small screens */
        @media (max-width: 600px) {
          .cal-container { transform: scale(0.85); transform-origin: top center; }
          .cal-container .cal-screen { min-width: 260px; font-size: 1.2rem; }
          .cal-container .btn { width:3rem; height:3rem; }
        }
      `}</style>

      <div className="cal-container">
        <div className="cal-screen">{screen}</div>

        <div>
          <button className="btn btn-green" disabled>MC</button>
          <button className="btn btn-green" disabled>MR</button>
          <button className="btn btn-green" disabled>M&plus;</button>
          <button className="btn btn-green" disabled>M&minus;</button>
          <button className="btn btn-red btn-active" onClick={ceClicked}>CE</button>
        </div>

        <div>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(7)}>7</button>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(8)}>8</button>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(9)}>9</button>
          <button className="btn btn-green" disabled>&divide;</button>
          <button className="btn btn-green" disabled>&radic;</button>
        </div>

        <div>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(4)}>4</button>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(5)}>5</button>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(6)}>6</button>
          <button className="btn btn-green" disabled>&times;</button>
          <button className="btn btn-green" disabled>%</button>
        </div>

        <div>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(1)}>1</button>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(2)}>2</button>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(3)}>3</button>
          <button className={minusClass} onClick={() => operatorClicked('-')}>&minus;</button>
          <button className="btn btn-green btn-active">1/&times;</button>
        </div>

        <div>
          <button className="btn btn-blue btn-active" onClick={() => numberClicked(0)}>0</button>
          <button className="btn btn-blue" disabled>.</button>
          <button className="btn btn-blue" disabled><sup>+</sup>/<sub>&minus;</sub></button>
          <button className={plusClass} onClick={() => operatorClicked('+')}>&plus;</button>
          <button className="btn btn-green btn-active" onClick={equalClicked}>=</button>
        </div>
      </div>
    </>
  );
};

export default Calculator;