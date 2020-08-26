import { init, randomHue, random } from '../lib';
const WIDTH = 2000;
const HEIGHT = 3000;

const paint = (ctx: CanvasRenderingContext2D) => {
  ctx.lineWidth = 20;
  ctx.font = `450px 'Russo One'`;
  ctx.strokeStyle = '#3870ff';
  ctx.strokeText('YAWN', WIDTH / 2 - 650, HEIGHT / 2 + 80 - 30);
  ctx.strokeStyle = '#d4133d';
  ctx.strokeText('YAWN', WIDTH / 2 - 650, HEIGHT / 2 + 80 + 30);
  ctx.strokeStyle = '#fff';
  ctx.strokeText('YAWN', WIDTH / 2 - 650, HEIGHT / 2 + 80);

  // ctx.font = `450px 'Russo One'`;
  // for (let i = 0; i < 7; i++) {
  //   ctx.fillStyle = '#3870ff';
  //   ctx.fillText('YAWN', 300, 400 + 500 * i - 30);
  //   ctx.fillStyle = '#d4133d';
  //   ctx.fillText('YAWN', 300, 400 + 500 * i + 30);
  //   ctx.fillStyle = '#fff';
  //   ctx.fillText('YAWN', 300, 400 + 500 * i);
  // }

  // ctx.font = `92px 'Russo One'`;
  // for (let x = 0; x < 7; x++) {
  //   for (let y = 0; y < 150; y++) {
  //     ctx.fillStyle = '#3870ff';
  //     ctx.fillText('YAWN', 300 * x - 50, 30 * y + 50 + 200 * y - 30);
  //     ctx.fillStyle = '#d4133d';
  //     ctx.fillText('YAWN', 300 * x - 50, 30 * y + 50 + 200 * y + 30);
  //     ctx.fillStyle = '#fff';
  //     ctx.fillText('YAWN', 300 * x - 50, 30 * y + 50 + 200 * y);
  //   }
  // }
};

setTimeout(() => {
  const link = document.createElement('link');

  link.setAttribute(
    'href',
    'https://fonts.googleapis.com/css2?family=Russo+One&display=swap'
  );
  link.setAttribute('rel', 'stylesheet');

  document.head.appendChild(link);

  const ctx = init(WIDTH, HEIGHT);
  // ctx.fillStyle = '#fdfff5';
  ctx.fillStyle = '#090238';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});
