"use client";

import type { CSSProperties } from "react";

interface ToolSliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  formattedValue: string;
  helperText?: string;
  presets?: { label: string; value: number }[];
  onChange: (value: number) => void;
}

export function ToolSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  formattedValue,
  helperText,
  presets,
  onChange,
}: ToolSliderProps) {
  const clamped = Math.min(max, Math.max(min, value));
  const progressPct = max > min ? ((clamped - min) / (max - min)) * 100 : 0;

  const sliderStyle = {
    "--slider-progress": `${progressPct.toFixed(2)}%`,
  } as CSSProperties;

  const handleNumberChange = (raw: string) => {
    const normalized = raw.replace(/\s+/g, "").replace(",", ".");
    const parsed = Number(normalized);
    if (!Number.isNaN(parsed)) {
      onChange(Math.min(max, Math.max(min, parsed)));
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-navy">
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            aria-label={`${label} (${unit})`}
            value={Number.isFinite(value) ? value : 0}
            min={min}
            max={max}
            step={step}
            onChange={(e) => handleNumberChange(e.target.value)}
            className="w-28 sm:w-32 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-right text-sm font-bold text-navy focus:border-green focus:bg-white focus:outline-none"
          />
          <span className="text-xs font-semibold text-slate-500 min-w-[2.25rem]">{unit}</span>
        </div>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamped}
        aria-valuetext={formattedValue}
        style={sliderStyle}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bonusly-range"
      />

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span>
          {min.toLocaleString("cs-CZ")} {unit}
        </span>
        {helperText && <span className="text-slate-500 font-medium">{helperText}</span>}
        <span>
          {max.toLocaleString("cs-CZ")} {unit}
        </span>
      </div>

      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {presets.map((preset) => {
            const active = Math.abs(value - preset.value) < step / 2;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => onChange(preset.value)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? "bg-navy text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
