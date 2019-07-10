import { init, createStack, createColumn, random } from './helpers';
import { randomHue } from './colors';
const WIDTH = 800;
const HEIGHT = 1200;

const paint = (div: HTMLDivElement) => {
  for (let i = 0; i < 60; i++) {
    const column = createColumn();
    for (let depth = 0; depth < 330; depth++) {
      const stack = createStack(i % 2 === 0);
      stack.style.backgroundColor = randomHue(
        (i % depth) - 50,
        (i % depth) + 50,
        random(20, depth % 290),
        random(40, 70)
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
