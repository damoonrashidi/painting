export function getIntensity(
  ref: CanvasRenderingContext2D,
  x: number,
  y: number,
  cubeWidth: number
): number {
  try {
    const { data } = ref.getImageData(x, y, cubeWidth, cubeWidth);
    let [r, g, b, a] = [0, 0, 0, 0];
    for (let i = 0; i < data.length; i += 4) {
      const [_r, _g, _b, _a] = data;
      r += _r;
      g += _g;
      b += _b;
      a += _a;
    }

    const n = data.length / 4;

    return r / n + g / n + b / n / 3;
  } catch (e) {
    return 0;
  }
}

export function createIntensityMap(
  ref: CanvasRenderingContext2D,
  imageSize: number,
  chunkSize: number
): Map<string, number> {
  const map = new Map<string, number>();

  for (let y = 0; y < imageSuze; y += chunkSize) {
    for (let x = 0; x < imageSuze; x += chunkSize) {}
  }

  return map;
}
