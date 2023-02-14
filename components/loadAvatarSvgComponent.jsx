import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function LoadAvatarSvgComponent() {
  return (
    <Svg width={13} height={13} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0H6v6H0v1h6v6h1V7h6V6H7V0z"
        fill="#FF6C00"
      />
    </Svg>
  );
}
