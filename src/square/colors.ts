import { random } from './helpers';
export default {
  bg: '#fffeee',
  main: '#b54c38',
};

export const randomHex = (
  min: number = 0,
  max: number = 0xffffff,
  opacity = 1
): number => parseInt(random(min, max).toString(), 16);
