import { motion } from "framer-motion";

export function StartingScreen({ category, setCategory, handleOnStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateX(100px)" }}
      animate={{ opacity: 1, transform: "translateX(0)" }}
      transition={{ duration: 1, delay: 1 }}
      className=" w-[320px] mx-auto"
    >
      <p className="text-4xl ">How much</p>
      <p className="text-4xl">do you really know?</p>
      <p className="text-2xl text-gray-700 mt-3">
        Take this 10 question quiz to find out.
      </p>
      <div className="mt-7">
        <label htmlFor="category" className="text-2xl">
          Category:
        </label>
        <select
          id="category"
          className="ml-5 w-40 h-10 rounded-lg text-center bg-orange-700 bg-opacity-40 cursor-pointer hover:bg-opacity-55"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="anime">Anime</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
        </select>

        <button
          className="w-24 h-12 mt-6 text-xl bg-orange-200 bg-opacity-80 hover:translate-y-[-3px] ease-in duration-100 rounded-lg [box-shadow:4px_4px_10px_0px_#635959] hover:bg-opacity-100"
          onClick={handleOnStart}
        >
          Start
        </button>
      </div>
    </motion.div>
  );
}
