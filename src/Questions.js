import Progress from "./Progress";
import Options from "./Options";
import { motion } from "framer-motion";

export default function Questions({ state, dispatch }) {
  const parser = new DOMParser();

  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(300px)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 1 }}
      className="min-w-[320px] max-w-[400px] mx-auto "
    >
      <QuestionStatus
        current={state.current}
        total={10}
        score={state.score}
      ></QuestionStatus>
      <p className="text-xl mt-4">
        {
          parser.parseFromString(
            state.questions[state.current].question,
            "text/html"
          ).body.textContent
        }
      </p>
      <Options
        options={state.questions[state.current].all_options}
        correct={state.questions[state.current].correct_answer}
        answered={state.answered}
        dispatch={dispatch}
      ></Options>
      <div className="mt-5 flex justify-end">
        {state.answered ? (
          state.current === 9 ? (
            <Submit dispatch={dispatch}></Submit>
          ) : (
            <Next dispatch={dispatch}></Next>
          )
        ) : null}
      </div>
    </motion.div>
  );
}

function QuestionStatus({ current, total, score }) {
  return (
    <div>
      <Progress current={current + 1} total={10}></Progress>
      <div className="flex justify-between mt-2 text-lg">
        <span>
          Score: <strong>{score}</strong>
        </span>
        <span>
          Question: <strong>{current + 1}</strong>/{total}
        </span>
      </div>
    </div>
  );
}

function Next({ dispatch }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-blue-500 w-20 h-8 hover:bg-blue-600 bg-opacity-80 hover:bg-opacity-80 [box-shadow:4px_4px_10px_0px_#635959]"
      onClick={() => {
        dispatch({ type: "setCurrent" });
        dispatch({ type: "setAnswered" });
      }}
    >
      Next
    </motion.button>
  );
}

function Submit({ dispatch }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-20 h-10 bg-green-500 hover:bg-green-600 rounded-lg [box-shadow:4px_4px_10px_0px_#635959]"
      onClick={() => dispatch({ type: "submit-screen" })}
    >
      Submit
    </motion.button>
  );
}
