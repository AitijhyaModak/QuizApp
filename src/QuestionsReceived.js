import { motion } from "framer-motion";

export default function QuestionsReceived({ dispatch }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateX(100px)" }}
      animate={{ opacity: 1, transform: "TranslateX(0)" }}
      transition={{ duration: 1 }}
      className="text-center w-[320px] mx-auto flex flex-col items-center"
    >
      <p className="text-3xl">Questions have been received.</p>
      <p className="text-3xl mt-8">Start the quiz when you are ready.</p>
      <button
        className="bg-green-500 hover:bg-green-700  hover:translate-y-[-3px] duration-100 ease-in w-20 h-12 rounded-lg mt-3 [box-shadow:4px_4px_10px_0px_#635959]"
        onClick={() => dispatch({ type: "questions-display" })}
      >
        Start
      </button>
    </motion.div>
  );
}
