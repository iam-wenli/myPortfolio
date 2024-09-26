import React, { useRef } from "react";
import { animated, useSpring, useSpringRef, useChain } from "@react-spring/web";
import bee from "../assets/P1bee.png";
import useBreakpoint from "./useBreakpoint";

const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

function Welcome() {
  const currentBreakpoint = useBreakpoint(breakpoints);

  const welcomeAnimationProps = {
    mobile: {
      from: { opacity: 0, backgroundcolor: "#06b6d4", transform: "scale(0)" },
      to: { opacity: 0.5, backgroundcolor: "#164e63", transform: "scale(3)" },
      config: { duration: 1000 },
    },
    tablet: {
      from: { opacity: 0, backgroundcolor: "#06b6d4", transform: "scale(0)" },
      to: { opacity: 0.5, backgroundcolor: "#164e63", transform: "scale(5)" },
      config: { duration: 1000 },
    },
    desktop: {
      from: { opacity: 0, backgroundcolor: "#06b6d4", transform: "scale(0)" },
      to: { opacity: 0.5, backgroundcolor: "#164e63", transform: "scale(7)" },
      config: { duration: 1000 },
    },
  };

  const welcomeRef = useSpringRef();
  const welcomeEffect = useSpring({
    ...welcomeAnimationProps[currentBreakpoint],
    ref: welcomeRef,
  });

  const beePath = "M39-10C38 53-66 48-65-9-65-72 36-78 39-10H-700Z";
  const beePathRef = useRef(null);

  const beeRef = useSpringRef();
  const beeProp = useSpring({
    from: { offset: 0 },
    to: { offset: 1 },
    config: { duration: 4000 },
    loop: true,
    ref: beeRef,
  });

  const getPointAtLength = (path, length) => {
    const point = path.getPointAtLength(length);
    return { x: point.x, y: point.y };
  };

  const AnimatedImage = animated(({ offset }) => {
    const path = beePathRef.current;
    if (!path) return null;

    const length = path.getTotalLength();
    const { x, y } = getPointAtLength(path, offset * length);

    return (
      <image
        href={bee}
        width="130"
        height="130"
        x={x - 10} // Center the image
        y={y - 10} // Center the image
        alt="moving"
        className="scale-x-[-1] w-28 sm:w-40"
      />
    );
  });

  useChain([welcomeRef, beeRef], [0, 0.5]);

  return (
    <div className="bg-cyan-500 h-screen flex flex-col justify-center items-center">
      <animated.h1 style={welcomeEffect} className="font-serif mb-28 sm:mb-56">
        Welcome
      </animated.h1>
      <svg width="5000" height="180" viewBox="80 -70 180 230">
        <path
          ref={beePathRef}
          d={beePath}
          fill="none"
          stroke="none"
          strokeWidth="0"
        />
        <AnimatedImage offset={beeProp.offset} />
      </svg>
    </div>
  );
}

export default Welcome;
