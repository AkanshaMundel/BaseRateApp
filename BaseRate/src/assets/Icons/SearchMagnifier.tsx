import React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

export interface RISearchMagnifier {}

export namespace PISearchMagnifier {}

export default function SearchMagnifier(props: RISearchMagnifier) {
  return (
    <Svg width={20} height={21} fill="none" {...props}>
      <G
        stroke="#64748B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Circle cx={9.806} cy={10.305} r={7.49} />
        <Path d="m15.015 15.904 2.937 2.93" />
      </G>
    </Svg>
  );
}
