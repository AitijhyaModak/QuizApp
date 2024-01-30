import { motion } from "framer-motion";

export default function SubmitScreen({ score, dispatch }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(200px)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 0.7 }}
      className="min-w-[320px] w-fit mx-auto flex flex-col items-center"
    >
      <Score score={score}></Score>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="rounded-lg hover:translate-y-[-3px] duration-100 ease-in w-24 h-10 mt-5 bg-green-500 hover:bg-green-600 [box-shadow:4px_4px_10px_0px_#635959]"
      >
        Play Again
      </button>
    </motion.div>
  );
}

function Score({ score }) {
  return (
    <div className="border-2 w-40 h-40 mx-auto rounded-full flex flex-col items-center bg-gradient-to-b from-orange-500 to-orange-300 border-blue-600">
      <span className="text-6xl mt-9 w-fit ">{score}</span>
      <span className="text-2xl mt-2">of 100</span>
    </div>
  );
}
