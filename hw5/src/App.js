import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [input, setInput] = useState("0");
  const [mr, setMR] = useState("");
  const [preview, setPreview] = useState("0");
  const [sc_notation, setNotation] = useState("0e0");
  const [check, setCheck] = useState(false);

  const handleClick = (e) => {
    setCheck(false);
    let current_input = e.target.name;
    if (current_input === "0") {
      if (input[0] === "0" && input.length <= 1) return;
      else if (
        input.search("NaN") !== -1 ||
        input.search("Infinity") !== -1 ||
        input.search("Error") !== -1
      ) {
        setInput(current_input);
      } else setInput(input.concat(current_input));
    } else {
      if (input.length === 1 && input[0] === "0") setInput(current_input);
      else if (
        input.search("NaN") !== -1 ||
        input.search("Infinity") !== -1 ||
        input.search("Error") !== -1
      )
        setInput(current_input);
      else setInput(input.concat(current_input));
    }
  };

  const handleOperator = (e) => {
    setCheck(false);
    let operators = ["+", "-", "*", "/"];
    let current_operator = e.target.name;
    if (
      input.search("NaN") !== -1 ||
      input.search("Infinity") !== -1 ||
      input.search("Error") !== -1
    )
      setInput("0" + current_operator);
    else if (operators.includes(input[input.length - 1])) return;
    else setInput(input.concat(current_operator));
  };

  const handlePoint = (e) => {
    setCheck(false);
    let point = e.target.name;
    console.log(input.indexOf("."));
    if (
      input.search("NaN") !== -1 ||
      input.search("Infinity") !== -1 ||
      input.search("Error") !== -1
    )
      setInput("0" + point);
    else if (input.indexOf(".") !== -1) return;
    else setInput(input.concat(point));
  };

  const handleCheck = () => {
    setCheck(!check);
    setNotation(eval(input).toExponential());
  };

  const deleteChar = () => {
    if (
      input.length > 1 &&
      input.slice(input.length - 3, input.length) !== "**2"
    )
      setInput(input.slice(0, -1));
    else if (
      input.length > 1 &&
      input.slice(input.length - 3, input.length) === "**2"
    ) {
      let first_paren = input.lastIndexOf("(");
      console.log(first_paren);
      if (first_paren > 1)
        setInput(
          input.slice(0, first_paren) +
            input.slice(first_paren + 1, input.length - 4)
        );
      else if (first_paren === 0) setInput(input.slice(1, -4));
      else if (first_paren === 1) setInput("(" + input.slice(2, -4));
    } else setInput("0");
  };

  const readMemory = () => {
    let operators = ["+", "-", "*", "/"];
    if (mr === "") {
      alert("Memory is empty!");
      return;
    }
    if (operators.includes(input[input.length - 1])) {
      setInput(input + mr);
    } else setInput(mr);
  };

  const clearMemory = () => {
    setMR("");
  };

  const saveMemory = () => {
    let operators = ["+", "-", "*", "/"];
    if (operators.includes(input[input.length - 1]))
      setMR(eval(input.slice(0, -1)).toString());
    else setMR(eval(input).toString());
  };

  const squareInput = () => {
    let operators = ["+", "-", "*", "/"];
    if (operators.includes(input[input.length - 1])) {
      setInput("(" + input.slice(0, -1) + ")**2" + input[input.length - 1]);
    } else setInput("(" + input + ")**2");
  };

  const outputResult = () => {
    try {
      setInput(eval(input).toString());
    } catch (err) {
      setInput("Error");
    }
    setPreview("0");
  };

  useEffect(() => {
    if (!isNaN(input[input.length - 1])) {
      try {
        setPreview(eval(input).toString());
      } catch (err) {
        setPreview("err");
      }
    } else {
      if (
        input.search("NaN") !== -1 ||
        input.search("Infinity") !== -1 ||
        input.search("Error") !== -1
      ) {
        try {
          setPreview(eval(input.slice(0, -1).toString()));
        } catch (err) {
          setPreview("err");
        }
      } else setPreview(input);
    }
  }, [input]);

  const specialSign = {
    backgroundColor: "var(--primary)",
  };

  let scientificToggle = (
    <label>
      <input type="checkbox" checked={check} onChange={handleCheck} />
    </label>
  );

  return (
    <div className="App">
      <div className="calculator">
        <div className="calculator__display">
          {scientificToggle}
          {check === true
            ? sc_notation
            : [preview !== "0" ? <span>({preview})</span> : "", input]}
        </div>
        <div className="calculator__operators">
          <button
            onClick={() => {
              setInput("0");
            }}
          >
            Clear
          </button>
          <button onClick={deleteChar}>D</button>
          <button name="/" onClick={handleOperator}>
            ÷
          </button>
          <button name="+" onClick={handleOperator}>
            +
          </button>
          <button name="-" onClick={handleOperator}>
            -
          </button>
          <button name="*" onClick={handleOperator}>
            ×
          </button>
          <button name="sqr" onClick={squareInput}>
            x<sup>2</sup>
          </button>
          <button name="mr" onClick={readMemory}>
            MR
          </button>
          <button name="mc" onClick={clearMemory}>
            MC
          </button>
          <button name="ms" onClick={saveMemory}>
            MS
          </button>
        </div>
        <div className="calculator__digits">
          <button name="1" onClick={handleClick}>
            1
          </button>
          <button name="2" onClick={handleClick}>
            2
          </button>
          <button name="3" onClick={handleClick}>
            3
          </button>
          <button name="4" onClick={handleClick}>
            4
          </button>
          <button name="5" onClick={handleClick}>
            5
          </button>
          <button name="6" onClick={handleClick}>
            6
          </button>
          <button name="7" onClick={handleClick}>
            7
          </button>
          <button name="8" onClick={handleClick}>
            8
          </button>
          <button name="9" onClick={handleClick}>
            9
          </button>
          <button name="." style={specialSign} onClick={handlePoint}>
            .
          </button>
          <button name="0" onClick={handleClick}>
            0
          </button>
          <button name="=" style={specialSign} onClick={outputResult}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
