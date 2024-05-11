import React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export interface RIMenuBar {}

export namespace PIMenuBar {}

export default function MenuBar(props: RIMenuBar) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <G fill="#242425" clipPath="url(#a)">
        <Path d="M1 6h22a1 1 0 1 0 0-2H1a1 1 0 0 0 0 2ZM23 9H1a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2ZM23 19H1a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2ZM23 14H1a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2Z" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
