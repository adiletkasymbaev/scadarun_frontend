import type { IconBaseProps } from "../types/icons";

type NuclearPowerPlantColors = {
  strokeColor?: string;
};

export const NuclearPowerPlantIcon = ({
  strokeColor = "black",
  ...props
}: IconBaseProps & NuclearPowerPlantColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="128"
    height="128"
    viewBox="0 0 128 128"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_npp)">
      {/* Outer frame */}
      <rect
        x="2"
        y="2"
        width="124"
        height="124"
        stroke={strokeColor}
        strokeWidth="4"
      />

      <g clipPath="url(#clip1_npp)">
        <line x1="30.7607" y1="42.9012" x2="49.0905" y2="28.4303" stroke={strokeColor} strokeWidth="4" />
        <line x1="78.7607" y1="97.9012" x2="97.0905" y2="83.4303" stroke={strokeColor} strokeWidth="4" />
        <line x1="57.4554" y1="101.403" x2="103.803" y2="64.8127" stroke={strokeColor} strokeWidth="4" />
        <line x1="21.7607" y1="62.814" x2="70.3802" y2="24.4302" stroke={strokeColor} strokeWidth="4" />
        <line x1="42.0199" y1="97.5442" x2="99.7257" y2="51.987" stroke={strokeColor} strokeWidth="4" />
        <line x1="25.6196" y1="76.6046" x2="90.8974" y2="25.0695" stroke={strokeColor} strokeWidth="4" />
        <line x1="25.6196" y1="93.9698" x2="99.8247" y2="35.3868" stroke={strokeColor} strokeWidth="4" />

        <circle
          cx="63.5"
          cy="63.5"
          r="37.5"
          stroke={strokeColor}
          strokeWidth="4"
        />
      </g>
    </g>

    <defs>
      <clipPath id="clip0_npp">
        <rect width="128" height="128" fill="white" />
      </clipPath>

      <clipPath id="clip1_npp">
        <rect x="24" y="24" width="79" height="79" rx="39.5" fill="white" />
      </clipPath>
    </defs>
  </svg>
);