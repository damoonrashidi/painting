import { randomFloat } from '../lib';
export default {
  bg: '#fffeee',
  main: '#b54c38',
};

export const randomHue = (
  min: number = 0,
  max: number = 360,
  opacity = 1
): string => `hsla(${randomFloat(min, max)}, 85%, 50%, ${opacity})`;
