import styles from "./Option.module.css";
import { useEffect, useRef } from "react";

export default function Options({ options, correct, answered, dispatch }) {
  return (
    <div className="flex flex-col gap-2 text-left mt-8">
      {options.map((item) => (
        <Option
          optionValue={item}
          correct={correct}
          key={item}
          answered={answered}
          dispatch={dispatch}
        ></Option>
      ))}
    </div>
  );
}

function Option({ optionValue, correct, answered, dispatch }) {
  useEffect(
    function () {
      myRef.current.classList.add(styles.normalOption);
    },
    [answered, correct, optionValue]
  );
  useEffect(function () {
    if (answered === false) return;
    if (optionValue === correct)
      myRef.current.classList.add(styles.correctAnswer);
    else myRef.current.classList.add(styles.neutralAnswer);
  });

  function handleClick() {
    if (answered === true) return;
    if (optionValue !== correct)
      myRef.current.classList.add(styles.wrongAnswer);
    else dispatch({ type: "setScore" });
    myRef.current.classList.add(styles.clicked);
    dispatch({ type: "setAnswered" });
  }

  const parser = new DOMParser();
  const myRef = useRef(null);

  return (
    <button
      ref={myRef}
      className="border-2 border-gray-500 w-full text-left p-1  "
      onClick={handleClick}
    >
      {parser.parseFromString(optionValue, "text/html").body.textContent}
    </button>
  );
}
