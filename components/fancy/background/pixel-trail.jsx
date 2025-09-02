"use client";

import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { useDimensions } from "@/hooks/use-dimensions";

// PixelTrail: a performant grid of "pixels" that react to mouse movement.
// Fixes included:
// - avoids long "teleport" trails by resetting previous position on enter
// - avoids showing stuck opaque pixels on mouseleave by clearing the hovered pixel
//   before forcing the fade animation
// - uses a registry of pixel callbacks instead of querying DOM by id (more robust)
// - passes x/y explicitly to pixels (no id parsing)

const PixelTrail = ({
  pixelSize = 20,
  fadeDuration = 800, // ms
  delay = 0, // ms
  className,
  pixelClassName,
}) => {
  const containerRef = useRef(null);
  const dimensions = useDimensions(containerRef) || { width: 0, height: 0 };
  const trailId = useRef(uuidv4());

  // registry to hold animate functions for each pixel keyed by "x-y"
  const pixelRegistryRef = useRef(new Map());

  // helpers to register/unregister pixels
  const registerPixel = useCallback((x, y, fn) => {
    pixelRegistryRef.current.set(`${x}-${y}`, fn);
  }, []);
  const unregisterPixel = useCallback((x, y) => {
    pixelRegistryRef.current.delete(`${x}-${y}`);
  }, []);

  // track previous and current hovered pixel. null = none.
  const prevPos = useRef(null);
  const currentPixel = useRef(null);

  // when the mouse enters the container, we want to reset prevPos so we don't
  // create a long interpolated trail from the last place the cursor was.
  const handleMouseEnter = useCallback(() => {
    prevPos.current = null;
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      // clamp to grid bounds
      const cols = Math.max(1, Math.ceil(dimensions.width / pixelSize));
      const rows = Math.max(1, Math.ceil(dimensions.height / pixelSize));
      const cx = Math.min(Math.max(x, 0), cols - 1);
      const cy = Math.min(Math.max(y, 0), rows - 1);

      const start = prevPos.current;

      // If we have no previous position, just animate the current pixel only
      if (!start) {
        const key = `${cx}-${cy}`;
        const fn = pixelRegistryRef.current.get(key);
        if (fn) fn();
      } else {
        const dx = cx - start.x;
        const dy = cy - start.y;
        const steps = Math.max(Math.abs(dx), Math.abs(dy), 1);

        for (let i = 0; i <= steps; i++) {
          const px = start.x + Math.round((dx * i) / steps);
          const py = start.y + Math.round((dy * i) / steps);
          const key = `${px}-${py}`;
          const fn = pixelRegistryRef.current.get(key);
          if (fn) fn();
        }
      }

      prevPos.current = { x: cx, y: cy };
      currentPixel.current = { x: cx, y: cy };
    },
    [dimensions.width, dimensions.height, pixelSize]
  );

  const handleMouseLeave = useCallback(() => {
    // remember the last hovered pixel
    const last = currentPixel.current || prevPos.current;

    // clear hovered and previous positions first so pixels don't think they are hovered
    currentPixel.current = null;
    prevPos.current = null;

    if (last) {
      const key = `${last.x}-${last.y}`;
      const fn = pixelRegistryRef.current.get(key);
      if (fn) fn();
    }
  }, []);

  const columns = useMemo(() => Math.max(1, Math.ceil(dimensions.width / pixelSize)), [
    dimensions.width,
    pixelSize,
  ]);
  const rows = useMemo(() => Math.max(1, Math.ceil(dimensions.height / pixelSize)), [
    dimensions.height,
    pixelSize,
  ]);

  // Keep registry clean on unmount
  useEffect(() => {
    return () => pixelRegistryRef.current.clear();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-auto", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex leading-[0]">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              x={colIndex}
              y={rowIndex}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              registerPixel={registerPixel}
              unregisterPixel={unregisterPixel}
              currentPixelRef={currentPixel}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PixelTrail;

const PixelDot = React.memo(function PixelDot({
  x,
  y,
  size,
  fadeDuration,
  delay,
  className,
  registerPixel,
  unregisterPixel,
  currentPixelRef,
}) {
  const controls = useAnimationControls();

  // animatePixel can be asked to force a fade even if the pixel thinks it's hovered
  const animatePixel = useCallback(
    ({ forceFade = false } = {}) => {
      // If this pixel is currently hovered and we are not forcing a fade, show it and return
      if (!forceFade && currentPixelRef.current?.x === x && currentPixelRef.current?.y === y) {
        controls.set({ opacity: 1 });
        return;
      }

      // show immediately, then fade out
      controls.set({ opacity: 1 });
      controls.start({
        opacity: 0,
        transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
      });
    },
    [controls, fadeDuration, delay, x, y, currentPixelRef]
  );

  // register on mount and unregister on unmount
  useEffect(() => {
    registerPixel(x, y, () => animatePixel({ forceFade: true }));
    return () => unregisterPixel(x, y);
  }, [x, y, registerPixel, unregisterPixel, animatePixel]);

  return (
    <motion.div
      className={cn("pointer-events-none inline-block", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
      initial={{ opacity: 0 }}
      animate={controls}
    />
  );
});

PixelDot.displayName = "PixelDot";
