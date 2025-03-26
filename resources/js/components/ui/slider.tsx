// components/ui/slider.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  minStepsBetweenThumbs?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      min,
      max,
      step = 1,
      value,
      onValueChange,
      minStepsBetweenThumbs = 0,
      ...props
    },
    ref
  ) => {
    const range = max - min;
    const stepCount = range / step;
    const minValue = Math.min(...value);
    const maxValue = Math.max(...value);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = parseFloat(e.target.value);
      if (newMin + minStepsBetweenThumbs * step <= maxValue) {
        onValueChange([newMin, maxValue]);
      }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = parseFloat(e.target.value);
      if (newMax - minStepsBetweenThumbs * step >= minValue) {
        onValueChange([minValue, newMax]);
      }
    };

    const minPos = ((minValue - min) / range) * 100;
    const maxPos = ((maxValue - min) / range) * 100;

    return (
      <div className={cn("relative w-full", className)}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full appearance-none h-2 bg-transparent pointer-events-none z-10"
          style={{
            WebkitAppearance: "none",
            zIndex: minValue > max - 100 ? 5 : 3,
          }}
          {...props}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none h-2 bg-transparent pointer-events-none z-10"
          style={{
            WebkitAppearance: "none",
            zIndex: 4,
          }}
          {...props}
        />

        <div className="relative w-full h-2">
          <div className="absolute w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          <div
            className="absolute h-2 bg-blue-500 rounded-full dark:bg-blue-600"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
          <div
            className="absolute w-4 h-4 bg-blue-600 rounded-full -top-1 dark:bg-blue-500"
            style={{ left: `calc(${minPos}% - 8px)` }}
          />
          <div
            className="absolute w-4 h-4 bg-blue-600 rounded-full -top-1 dark:bg-blue-500"
            style={{ left: `calc(${maxPos}% - 8px)` }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };