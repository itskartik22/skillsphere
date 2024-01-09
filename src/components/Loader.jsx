import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const loadingContainer = {
  width: "4rem",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
};
const loadingCircle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "#3A36DB",
  borderRadius: "0.5rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
      // loop: "Infinity"
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
      // loop: "Infinity"
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "60%",
  },
};
const loadingCircleTransition = {
  duration : 0.4,
  repeat: Infinity,
  repeatType: "mirror",
  ease: 'easeInOut'
}

const Loader = () => {
  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 w-full min-h-screen z-50 bg-white opacity-30" />
      <div className="flex w-full justify-center items-center h-screen">
        <motion.div
          style={loadingContainer}
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
            <motion.span
              style={loadingCircle}
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            ></motion.span>
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Loader;