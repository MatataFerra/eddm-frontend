import type { Variants } from "motion/react";

const MOTION_COVER_IMAGE: Variants = {
  rest: {
    opacity: 0.3,
    scale: 1.25,
    filter: "blur(2px)",
  },
  hover: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const MOTION_SLIDE_TEXT: Variants = {
  rest: {
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    fontSize: "2rem",
    color: "#ffffff",
    backgroundColor: "hsla(240, 14%, 15%, 0)",
    borderRadius: "0px",
    padding: "0rem",
    boxShadow: "none",
  },
  hover: {
    top: 0,
    left: 0,
    x: "5%",
    y: "10%",
    fontSize: "1.5rem",
    color: "hsla(40, 60%, 95%, 1)",
    backgroundColor: "hsla(240, 15%, 15%, .3)",
    borderRadius: "10px",
    padding: ".5rem",
    transition: {
      // Animación de movimiento (spring)
      top: { type: "spring", bounce: 0.6, duration: 0.4, damping: 15 },
      left: { type: "spring", bounce: 0.6, duration: 0.4, damping: 15 },
      x: { type: "spring", bounce: 0.6, duration: 0.4, damping: 15 },
      y: { type: "spring", bounce: 0.6, duration: 0.4, damping: 15 },
      // Las propiedades de estilo "finales" entran con delay suave
      backgroundColor: { delay: 0.2, duration: 0.3 },
      borderRadius: { delay: 0.2, duration: 0.3 },
      padding: { delay: 0.2, duration: 0.3 },
    },
  },
};

export const MOTION_ANIMATIONS = {
  cover_image: MOTION_COVER_IMAGE,
  slideToCorner: MOTION_SLIDE_TEXT,
};
