"use client";

import * as React from "react";
import { AnimatePresence, motion, type HTMLMotionProps, type MotionProps } from "framer-motion";

const cn = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

type RotatingTextProps = {
  text: string | string[];
  duration?: number;
  y?: number;
  containerClassName?: string;
  textClassName?: string;
  transition?: MotionProps["transition"];
} & Omit<HTMLMotionProps<"span">, "children">;

const RotatingText = ({
  text,
  duration = 2200,
  y = 14,
  containerClassName,
  textClassName,
  transition = { duration: 0.35, ease: "easeOut" },
  ...props
}: RotatingTextProps) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!Array.isArray(text) || text.length <= 1) {
      return;
    }
    const interval = window.setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, duration);
    return () => window.clearInterval(interval);
  }, [text, duration]);

  const currentText = Array.isArray(text) ? text[index] : text;

  return (
    <span className={cn("inline-block overflow-hidden py-1", containerClassName)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          initial={{ opacity: 0, y: -y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y }}
          transition={transition}
          className={textClassName}
          {...props}
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export { RotatingText, type RotatingTextProps };
export default RotatingText;
