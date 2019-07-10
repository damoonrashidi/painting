import { random } from './helpers';

export const randomHue = (
  min: number = 0,
  max: number = 360,
  saturation: number = 30,
  lightness: number = 50,
  opacity = 1
): string =>
  `hsla(${random(min, max)}, ${saturation}%, ${lightness}%, ${opacity})`;
