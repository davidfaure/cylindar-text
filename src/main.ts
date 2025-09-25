import "./style.css";
import "./cylindar.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const items: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".cylindar__text__item"
);

const Textwrapper = document.querySelector(
  ".cylindar__text__wrapper"
) as HTMLElement;
const wrapper = document.querySelector(".cylindar__wrapper") as HTMLElement;

const title = document.querySelector(".cylindar__text") as HTMLParagraphElement;

const init = () => {
  calculatePositions();

  ScrollTrigger.create({
    trigger: title,
    start: "center center",
    end: "+=2000svh", // you can play with this value to change the speed of the animation
    pin: wrapper,
    scrub: 2,
    animation: gsap.fromTo(
      Textwrapper,
      { rotateX: -80 },
      { rotateX: 270, ease: "none" }
    ),
  });
};

const calculatePositions = () => {
  const offset = 0.4; // worth playing with this on mobile to get the best result
  // you can play with radius to change the distance of the text
  const radius = Math.min(window.innerWidth, window.innerHeight) * offset;
  const spacing = 180 / items.length;

  items.forEach((item, index) => {
    const angle = (index * spacing * Math.PI) / 180;
    const rotationAngle = index * -spacing;

    const x = 0; // Center offset based on radius
    const y = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    item.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotationAngle}deg)`;
  });
};

init();

window.addEventListener("resize", calculatePositions);
