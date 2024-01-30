import { motion } from "framer-motion";

export default function Error({ dispatch }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateX(100px)" }}
      animate={{ opacity: 1, transform: "translateX(0)" }}
      transition={{ duration: 1 }}
      className="w-[320px] mx-auto border-2"
    >
      <p className="text-3xl text-center text-red-600 font-semibold">Error</p>
      <p className="text-2xl text-center mt-5">
        Please check your internet connection and try again.
      </p>
      <button
        className="mt-3 w-[55px] h-9 ml-[calc(160px-27.5px)] bg-red-400 bg-opacity-80 hover:bg-opacity-100 hover:translate-y-[-3px] ease-in duration-100"
        onClick={() => dispatch({ type: "starting-screen" })}
      >
        Back
      </button>
    </motion.div>
  );
}
