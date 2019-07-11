import { init, createStack, createColumn, random } from './helpers';
import { randomHue } from './colors';
const WIDTH = 800;
const HEIGHT = 1200;
let consecutiveGap = 0;

const paint = (div: HTMLDivElement) => {
  for (let i = 0; i < 67; i++) {
    const column = createColumn();
    for (let depth = 0; depth < 330; depth++) {
      const stack = createStack(i % 2 === 0, true);
      stack.style.backgroundColor = randomHue(
        ((i - 30) % depth) + 290,
        (i % depth) + 340,
        random(20, depth % 230),
        random(30, 50)
      );
      column.appendChild(stack);
    }
    div.appendChild(column);
  }
};

setTimeout(() => {
  const div = init(WIDTH, HEIGHT);
  paint(div);
  console.log('painting');
}, 0);
