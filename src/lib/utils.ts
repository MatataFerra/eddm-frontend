import { clsx, type ClassValue } from "clsx";
import { Variants } from "motion/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Category = {
  type: "category";
  cover?: boolean;
  name:
    | "context"
    | "enero"
    | "febrero"
    | "marzo"
    | "abril"
    | "mayo"
    | "junio"
    | "julio"
    | "agosto"
    | "septiembre"
    | "octubre"
    | "noviembre"
    | "diciembre";
};

type Phrase = {
  type: "phrase";
  text: string;
  className?: string;
};

export type MonthsOrdered = Category | Phrase;

export const monthsOrdered: MonthsOrdered[] = [
  { type: "category", name: "context", cover: true },
  { type: "category", name: "enero" },
  { type: "category", name: "febrero", cover: true },
  { type: "category", name: "marzo" },
  { type: "category", name: "abril" },
  { type: "category", name: "mayo", cover: true },
  { type: "category", name: "junio" },
  { type: "category", name: "julio" },
  { type: "category", name: "agosto" },
  { type: "category", name: "septiembre" },
  { type: "category", name: "octubre" },
  { type: "category", name: "noviembre" },
  { type: "category", name: "diciembre" },
];

export const MOTION_COVER_IMAGE: Record<string, Variants> = {
  cover_image: {
    initial_image: {
      opacity: 0.3,
      scale: 1.25,
      filter: "blur(2px)",
    },
    hover_image: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
};

export const MOTION_ANIMATIONS: Record<string, Variants> = {
  cover_image: MOTION_COVER_IMAGE.cover_image,
  // 1. Animación original (centro a esquina)
  slideToCorner: {
    rest: {
      top: "50%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      fontSize: "2rem",
      color: "#ffffff",
      backgroundColor: "transparent",
      borderRadius: "0",
      padding: "0",
      boxShadow: "none",
    },
    hover: {
      top: 0,
      left: 0,
      x: "5%", // Puntos intermedios
      y: "10%",
      fontSize: "1.5rem",
      color: "hsla(40, 60%, 95%, 1)",
      transition: {
        type: "spring",
        bounce: 0.6,
        duration: 0.4,
        damping: 15,
      },
    },
    finalStyle: {
      backgroundColor: "hsla(240, 15%, 15%, .3)",
      borderRadius: "10px",
      padding: ".5rem",
      transition: { delay: 0.2, duration: 0.3 },
    },
  },

  // 2. Fade out suave
  fadeOut: {
    rest: {
      opacity: 1,
      color: "#ffffff",
      scale: 1,
    },
    hover: {
      opacity: 0,
      color: "#aaaaaa",
      scale: 0.98,
    },
  },

  // 3. Zoom in
  zoomIn: {
    rest: {
      scale: 1,
      opacity: 0.8,
    },
    hover: {
      scale: 1.2,
      opacity: 1,
    },
  },

  // 4. Rotación 3D
  rotate3D: {
    rest: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
    hover: {
      rotateX: 20,
      rotateY: 20,
      rotateZ: 5,
    },
  },

  // 5. Efecto de levitación
  levitate: {
    rest: {
      y: 0,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    },
    hover: {
      y: -15,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
    },
  },

  // 6. Cambio de color dramático
  colorChange: {
    rest: {
      color: "#ffffff",
      backgroundColor: "#000000",
    },
    hover: {
      color: "#000000",
      backgroundColor: "#ffffff",
      border: "2px solid #000000",
    },
  },

  // 7. Efecto de desenfoque
  blurEffect: {
    rest: {
      filter: "blur(0px)",
    },
    hover: {
      filter: "blur(2px)",
    },
  },

  // 8. Animación tipo "pulso"
  pulse: {
    rest: {
      scale: 1,
    },
    hover: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
      },
    },
  },

  // 9. Efecto de onda
  wave: {
    rest: {
      y: 0,
    },
    hover: {
      y: [0, -10, 0, -5, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  },

  // 10. Efecto de desvanecimiento vertical
  verticalDownFade: {
    rest: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: 50,
      opacity: 0,
    },
  },
  verticalUpFade: {
    rest: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -50,
      opacity: 0,
    },
  },

  // 11. Distorsión horizontal
  horizontalSkew: {
    rest: {
      skewX: 0,
    },
    hover: {
      skewX: 15,
    },
  },

  // 12. Efecto de texto tipográfico
  typographyEffect: {
    rest: {
      letterSpacing: "0px",
      fontWeight: 400,
    },
    hover: {
      letterSpacing: "2px",
      fontWeight: 700,
    },
  },

  // 13. Efecto de neón
  neonEffect: {
    rest: {
      textShadow: "0 0 0px #fff",
      color: "#ffffff",
    },
    hover: {
      textShadow: "0 0 10px #fff, 0 0 20px #ff00de",
      color: "#ff00de",
    },
  },

  // 14. Efecto de mosaico
  mosaicEffect: {
    rest: {
      opacity: 1,
      scale: 1,
    },
    hover: {
      opacity: 0.8,
      scale: 0.9,
    },
  },

  // 15. Efecto de rebote
  bounceEffect: {
    rest: {
      y: 0,
    },
    hover: {
      y: -20,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    },
  },
};
