import type { IconBaseProps } from "../types/icons";

export type HalfChassisFullColors = {
  stroke?: string;
  fill?: string;
};

export const HalfChassisFullIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & HalfChassisFullColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="132"
    viewBox="0 0 42 132"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_half_chassis_full)">
      <line
        y1="-2"
        x2="24.1868"
        y2="-2"
        transform="matrix(0.868243 -0.496139 -0.496139 -0.868243 0 12)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.6982"
        y2="-2"
        transform="matrix(0.850265 0.526355 0.526355 -0.850265 21 0)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.1868"
        y2="-2"
        transform="matrix(0.868243 -0.496139 -0.496139 -0.868243 0 22)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.6982"
        y2="-2"
        transform="matrix(0.850265 0.526355 0.526355 -0.850265 21 10)"
        stroke={stroke}
        strokeWidth="4"
      />

      <path
        d="M19 13C19 11.8954 19.8954 11 21 11C22.1046 11 23 11.8954 23 13H21H19ZM23 44L23 46H19V44H21H23ZM21 13H23V44H21H19L19 13H21Z"
        fill={fill}
      />

      <line
        y1="-2"
        x2="24.1868"
        y2="-2"
        transform="matrix(0.868243 -0.496139 -0.496139 -0.868243 0 12)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.6982"
        y2="-2"
        transform="matrix(0.850265 0.526355 0.526355 -0.850265 21 0)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.1868"
        y2="-2"
        transform="matrix(0.868243 -0.496139 -0.496139 -0.868243 0 22)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.6982"
        y2="-2"
        transform="matrix(0.850265 0.526355 0.526355 -0.850265 21 10)"
        stroke={stroke}
        strokeWidth="4"
      />

      <path
        d="M23 13C23 11.8954 22.1046 11 21 11C19.8954 11 19 11.8954 19 13H21H23ZM19 91V93H23V91H21H19ZM21 13H19L19 91H21H23L23 13H21Z"
        fill={fill}
      />

      <line
        x1="0.992278"
        y1="118.264"
        x2="21.9923"
        y2="130.264"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="19.9473"
        y1="130.299"
        x2="40.9473"
        y2="117.299"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="0.992278"
        y1="108.264"
        x2="21.9923"
        y2="120.264"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="19.9473"
        y1="120.299"
        x2="40.9473"
        y2="107.299"
        stroke={stroke}
        strokeWidth="4"
      />

      <path
        d="M19 119C19 120.105 19.8954 121 21 121C22.1046 121 23 120.105 23 119H21H19ZM23 88L23 86H19V88H21H23ZM21 119H23V88H21H19L19 119H21Z"
        fill={fill}
      />
    </g>

    <defs>
      <clipPath id="clip0_half_chassis_full">
        <rect width="42" height="132" fill="white" />
      </clipPath>
    </defs>
  </svg>
);