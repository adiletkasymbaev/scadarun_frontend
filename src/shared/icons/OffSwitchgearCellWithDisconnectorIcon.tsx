import type { IconBaseProps } from "../types/icons";

export type OffSwitchgearCellWithDisconnectorColors = {
  stroke?: string;
  fill?: string;
};

export const OffSwitchgearCellWithDisconnectorIcon = ({
  stroke = "#EA7474",
  fill = "#EA7474",
  ...props
}: IconBaseProps & OffSwitchgearCellWithDisconnectorColors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="187"
    viewBox="0 0 42 187"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_off_switchgear_cell_disconnector)">
      <line
        y1="-2"
        x2="24.1868"
        y2="-2"
        transform="matrix(0.868243 -0.496139 -0.496139 -0.868243 0 25)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.6982"
        y2="-2"
        transform="matrix(0.850265 0.526355 0.526355 -0.850265 21 13)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.1868"
        y2="-2"
        transform="matrix(0.868243 -0.496139 -0.496139 -0.868243 0 35)"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        y1="-2"
        x2="24.6982"
        y2="-2"
        transform="matrix(0.850265 0.526355 0.526355 -0.850265 21 23)"
        stroke={stroke}
        strokeWidth="4"
      />

      <path
        d="M19 26C19 24.8954 19.8954 24 21 24C22.1046 24 23 24.8954 23 26H21H19ZM23 57L23 59H19V57H21H23ZM21 26H23V57H21H19L19 26H21Z"
        fill={fill}
      />

      <path d="M21 0V17" stroke={stroke} strokeWidth="4" />

      <rect y="62" width="42" height="4" fill={fill} />
      <rect y="120" width="42" height="4" fill={fill} />

      <line
        x1="0.992278"
        y1="160.264"
        x2="21.9923"
        y2="172.264"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="19.9473"
        y1="172.299"
        x2="40.9473"
        y2="159.299"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="0.992278"
        y1="150.264"
        x2="21.9923"
        y2="162.264"
        stroke={stroke}
        strokeWidth="4"
      />
      <line
        x1="19.9473"
        y1="162.299"
        x2="40.9473"
        y2="149.299"
        stroke={stroke}
        strokeWidth="4"
      />

      <path
        d="M19 161C19 162.105 19.8954 163 21 163C22.1046 163 23 162.105 23 161H21H19ZM23 130L23 128H19V130H21H23ZM21 161H23V130H21H19L19 161H21Z"
        fill={fill}
      />

      <path d="M21 187V170" stroke={stroke} strokeWidth="4" />

      {/* Off mark */}
      <rect
        x="18"
        y="111.65"
        width="42"
        height="4"
        transform="rotate(-60.7641 18 111.65)"
        fill={fill}
      />
    </g>

    <defs>
      <clipPath id="clip0_off_switchgear_cell_disconnector">
        <rect width="42" height="187" fill="white" />
      </clipPath>
    </defs>
  </svg>
);