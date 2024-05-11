import React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface RIArrowLeft {}

export namespace PIArrowLeft {}

export default function ArrowLeft(props: RIArrowLeft) {
  const {} = props;

  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fill="#222"
        d="M.88 14.09 4.75 18a1.001 1.001 0 0 0 1.639-.325 1 1 0 0 0-.219-1.094L2.61 13H23a1 1 0 0 0 0-2H2.55l3.62-3.62a1 1 0 0 0 0-1.38 1 1 0 0 0-1.42 0L.88 9.85a3 3 0 0 0 0 4.24Z"
      />
    </Svg>
  );
}
