import { useEffect, useReducer, useState } from "react";
import { StartingScreen } from "./StartingScreen";
import Loading from "./Loading";
import QuestionsReceived from "./QuestionsReceived";
import Questions from "./Questions";
import Error from "./Error";
import SubmitScreen from "./SubmitScreen";
import { useAnimate } from "framer-motion";

const url_anime =
  "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple";
const url_politics =
  "https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&type=multiple";
const url_sports =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const initialState = {
  status: "starting-screen",
  questions: [],
  current: 0,
  score: 0,
  answered: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "starting-screen":
      return { ...state, status: "starting-screen" };
    case "loading":
      return { ...state, status: "loading" };
    case "questions-display":
      return { ...state, status: "questions-display" };
    case "error":
      return { ...state, status: "error" };
    case "questions-received":
      return { ...state, status: "questions-received" };
    case "setQuestions": {
      return { ...state, questions: action.payload };
    }
    case "setAnswered": {
      return { ...state, answered: !state.answered };
    }
    case "setScore": {
      return { ...state, score: state.score + 10 };
    }
    case "setCurrent":
      return { ...state, current: state.current + 1 };
    case "submit-screen":
      return { ...state, status: "submit-screen" };
    case "reset":
      return initialState;
    default:
      throw new Error("Wrong value of state");
  }
}

export default function Quiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [category, setCategory] = useState("anime");
  function handleOnStart() {
    dispatch({ type: "loading" });
    async function getQuestions() {
      try {
        const url =
          category === "anime"
            ? url_anime
            : category === "sports"
            ? url_sports
            : url_politics;
        const res = await fetch(url);
        const p = await res.json();
        dispatch({ type: "questions-received" });
        let questions_array = [];
        p.results.map((item) =>
          questions_array.push({
            ...item,
            all_options: makeAndShuffle(
              item.correct_answer,
              item.incorrect_answers
            ),
          })
        );
        dispatch({ type: "setQuestions", payload: questions_array });
      } catch (err) {
        dispatch({ type: "error" });
      }
    }
    getQuestions();
  }

  return (
    <div className="mt-32">
      {state.status === "starting-screen" ? (
        <StartingScreen
          category={category}
          setCategory={setCategory}
          handleOnStart={handleOnStart}
        ></StartingScreen>
      ) : null}
      {state.status === "loading" ? <Loading></Loading> : null}
      {state.status === "questions-received" ? (
        <QuestionsReceived dispatch={dispatch}></QuestionsReceived>
      ) : null}
      {state.status === "questions-display" ? (
        <Questions
          state={state}
          dispatch={dispatch}
          key={state.questions[state.current].question}
        ></Questions>
      ) : null}
      {state.status === "error" ? <Error dispatch={dispatch}></Error> : null}
      {state.status === "submit-screen" ? (
        <SubmitScreen score={state.score} dispatch={dispatch}></SubmitScreen>
      ) : null}
    </div>
  );
}

function shuffle(options) {
  let currentIndex = options.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [options[currentIndex], options[randomIndex]] = [
      options[randomIndex],
      options[currentIndex],
    ];
  }

  return options;
}

function makeAndShuffle(correct, wrongans) {
  let options = [];
  options.push(correct);
  wrongans.map((wa) => options.push(wa));
  options = shuffle(options);
  return options;
}
