import React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

export interface RISearchBarCrossIcon {}

export namespace PISearchBarCrossIcon {}

export default function SearchBarCrossIcon(props: RISearchBarCrossIcon) {
  const {} = props;

  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.13802 2.19531L2.19531 3.13802L7.05729 8L2.19531 12.862L3.13802 13.8047L8 8.94271L12.862 13.8047L13.8047 12.862L8.94271 8L13.8047 3.13802L12.862 2.19531L8 7.05729L3.13802 2.19531Z"
        fill="#23263B"
      />
    </Svg>
  );
}
