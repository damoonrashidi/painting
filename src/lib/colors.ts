import { randomFloat } from './helpers';
export default {
  bg: '#fffeee',
  main: '#b54c38',
};

export const randomHue = (
  min: number = 0,
  max: number = 360,
  opacity = 1,
  saturation: number = 70,
  lightness: number = 60
): string =>
  `hsla(${randomFloat(min, max)}, ${saturation}%, ${lightness}%, ${opacity})`;
