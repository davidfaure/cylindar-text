# Cylindrical Text Effect

A mesmerizing 3D cylindrical text scroll effect created with pure CSS transforms and GSAP ScrollTrigger. Watch as text elements rotate around a cylinder as you scroll, creating a smooth and engaging visual experience.

https://github.com/user-attachments/assets/147a75b2-a31c-47b5-b6bb-b104bf892261

![Cylindrical Text Animation](./public/Cylindar_Text_Animation.mp4)

> 🎥 **Preview**: See the cylindrical text effect in action above

## What's Used

- **GSAP + ScrollTrigger** - Almost mandatory for smooth scroll-based animations
- **Lenis** - Optional smooth scrolling library that enhances the experience
- **Pure CSS 3D Transforms** - No Three.js needed, just CSS magic
- **TypeScript** - For type safety and better development experience

## Key CSS Properties That Make This Effect Alive

### Essential 3D Setup

```css
.cylindar__wrapper {
  perspective: 70vw; /* Creates the 3D viewing perspective */
}

.cylindar__text__wrapper {
  transform-style: preserve-3d; /* Enables 3D positioning for child elements */
  transform-origin: center center; /* Sets rotation point to center */
}

.cylindar__text__item {
  backface-visibility: hidden; /* Hides elements when rotated away */
  /* Try removing this property to see what happens! */
}
```

**The `perspective` property** defines how far the viewer is from the 3D scene. A larger value creates a more subtle 3D effect.

**`transform-style: preserve-3d`** is crucial - it tells the browser to render child elements in 3D space rather than flattening them.

**`transform-origin: center center`** ensures the cylinder rotates around its center point.

**`backface-visibility: hidden`** prevents text from showing through when elements rotate to face away from you. Try commenting this out to see the difference!

## Main Setup

### ScrollTrigger Configuration

```javascript
ScrollTrigger.create({
  trigger: title,
  start: "center center",
  end: "+=2000vh", // Controls animation duration/speed
  pin: wrapper, // Keeps the element fixed during scroll
  scrub: 2, // Links animation to scroll position
  animation: gsap.fromTo(
    Textwrapper,
    { rotateX: -80 },
    { rotateX: 270, ease: "none" }
  ),
});
```

**`pin`** - Keeps the wrapper element fixed in the viewport while scrolling. This is essential for the effect to work as it prevents the element from scrolling away.

**`scrub`** - Links the animation progress directly to scroll position. The number (2) adds slight delay/smoothing. Use `true` for immediate response or higher numbers for more lag.

**`animation`** - Rotates the text wrapper from -80° to 270°. Play with these values to change the rotation range and see different effects!

**`end: "+=2000vh"`** - Determines how much scrolling is needed to complete the animation. Larger values = slower animation, smaller values = faster animation.

### Calculate Positions Function

The magic happens in `calculatePositions()`:

```javascript
const calculatePositions = () => {
  const offset = 0.4; // Worth playing with this on mobile to get the best result
  // You can play with radius to change the distance of the text
  const radius = Math.min(window.innerWidth, window.innerHeight) * offset;
  const spacing = 180 / items.length; // Distributes items across 180 degrees

  items.forEach((item, index) => {
    const angle = (index * spacing * Math.PI) / 180;
    const rotationAngle = index * -spacing;

    const x = 0;
    const y = Math.sin(angle) * radius; // Vertical position on cylinder
    const z = Math.cos(angle) * radius; // Depth position on cylinder

    item.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotationAngle}deg)`;
  });
};
```

**Responsive Design**: The radius calculation uses viewport dimensions with a configurable offset multiplier to ensure the effect scales properly on all screen sizes. Adjust the `offset` value for optimal mobile experience.

**Mathematical Positioning**: Using sine and cosine functions to position elements in a perfect circle:

- `Math.sin(angle) * radius` - Y position (up/down)
- `Math.cos(angle) * radius` - Z position (forward/back)

**Centering**: `translate3d(-50%, -50%, 0)` centers each text element before applying the cylindrical positioning.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Experiment with the values to create your own unique effect!

## Customization Tips

- Adjust the `offset` multiplier (0.4) to make the cylinder larger or smaller - especially useful for mobile optimization
- Change the rotation range in the GSAP animation
- Modify the `end` value to control scroll speed
- Play with `spacing` distribution for different text arrangements
- Try different `scrub` values for various animation feels

Have fun creating your own cylindrical text effects! 🎯
