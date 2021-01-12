export const getColor = (
  ref: CanvasRenderingContext2D,
  x: number,
  y: number
): string => {
  const { data } = ref.getImageData(x, y, 1, 1);
  let [aR, aG, aB, aA] = [0, 0, 0, 0];
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = data;
    aR += r;
    aG += g;
    aB += b;
    aA += a;
  }

  const n = data.length / 4;

  return `rgba(${aR / n}, ${aG / n}, ${aB / n}, ${aA / n})`;
};

export const getDepth = (
  ref: CanvasRenderingContext2D,
  x: number,
  y: number
): number => {
  const { data } = ref.getImageData(x, y, 1, 1);
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = data;
    total = total + (r + g + b) / 3;
  }

  const n = data.length / 4;

  return total / n;
};

export function createDepthMap(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): Map<string, number> {
  const map = new Map<string, number>();

  for (let y = 852; y < 2737; y++) {
    for (let x = 865; x < 1865; x++) {
      const d = getDepth(ctx, x, y);
      map.set(`${x}:${y}`, d);
    }
  }

  return map;
}
