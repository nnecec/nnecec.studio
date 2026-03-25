"use client";

import type { HTMLMotionProps, Variants } from "framer-motion";

import { motion, useReducedMotion } from "framer-motion";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type MotionSectionProps = HTMLMotionProps<"div"> & {
  amount?: number;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
};

type MotionStaggerProps = HTMLMotionProps<"div"> & {
  amount?: number;
  delayChildren?: number;
  once?: boolean;
  stagger?: number;
};

type MotionStaggerItemProps = HTMLMotionProps<"div"> & {
  distance?: number;
  duration?: number;
};

function createRevealVariants({
  delay = 0,
  distance = 18,
  duration = 0.58,
  reduceMotion,
}: {
  delay?: number;
  distance?: number;
  duration?: number;
  reduceMotion: boolean;
}): Variants {
  if (reduceMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: {
        opacity: 1,
        transition: { delay: 0, duration: 0.01 },
        y: 0,
      },
    };
  }

  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      transition: { delay, duration, ease: REVEAL_EASE },
      y: 0,
    },
  };
}

export function MotionSection({
  amount = 0.2,
  delay = 0,
  distance = 18,
  duration = 0.62,
  once = true,
  ...props
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial="hidden"
      variants={createRevealVariants({
        delay,
        distance,
        duration,
        reduceMotion,
      })}
      viewport={{ amount, once }}
      whileInView="visible"
      {...props}
    />
  );
}

export function MotionStagger({
  amount = 0.16,
  delayChildren = 0.08,
  once = true,
  stagger = 0.1,
  ...props
}: MotionStaggerProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: reduceMotion
            ? { delayChildren: 0, staggerChildren: 0 }
            : { delayChildren, staggerChildren: stagger },
        },
      }}
      viewport={{ amount, once }}
      whileInView="visible"
      {...props}
    />
  );
}

export function MotionStaggerItem({
  distance = 18,
  duration = 0.58,
  ...props
}: MotionStaggerItemProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      variants={createRevealVariants({ distance, duration, reduceMotion })}
      {...props}
    />
  );
}
