import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [input, setInput] = useState("0");
  const [preview, setPreview] = useState("0");

  const handleClick = (e) => {
    let current_input = e.target.name;
    if (current_input === "0") {
      if (input[0] === "0" && input.length <= 1) return;
      else if (
        input.search("NaN") !== -1 ||
        input.search("Infinity") !== -1 ||
        input.search("Error") !== -1
      )
			{
        setInput(current_input);
			}
      else setInput(input.concat(current_input));
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
    // previewResult();
    let current_operator = e.target.name;
    if (
      input.search("NaN") !== -1 ||
      input.search("Infinity") !== -1 ||
      input.search("Error") !== -1
    )
      setInput("0" + current_operator);
    else setInput(input.concat(current_operator));
  };

  const handlePoint = (e) => {
    // previewResult();
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

  const deleteChar = () => {
    // previewResult();
    if (input.length > 1) setInput(input.slice(0, -1));
    else setInput("0");
  };

  const outputResult = () => {
    try {
      setInput(eval(input).toString());
    } catch (err) {
      setInput("Error");
    }
  };

  const previewResult = () => {
    try {
      setPreview(eval(input).toString());
    } catch (err) {
      setPreview("err");
    }
  };

	useEffect(() => {
		if(!isNaN(input[input.length-1]))
			previewResult();
	}, [input])

	const equalSign = {
		backgroundColor: 'var(--primary)'
	};

  return (
    <div className="App">
      <div className="calculator">
        <header>Calculator</header>
        <div className="calculator__display">
          <span>({preview})</span> {input}
        </div>
        <div className="calculator__operators">
          <button
            onClick={() => {
              setInput("0");
            }}
          >
            Clear
          </button>
          <button onClick={deleteChar}>C</button>
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
        </div>
        <div className="calculator__digits">
          <button name="0" onClick={handleClick}>
            0
          </button>
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
          <button name="." onClick={handlePoint}>
            .
          </button>
          <button name="=" style={equalSign} onClick={outputResult}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
