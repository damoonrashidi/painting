#!/bin/bash

echo "Scaffoling painting $1";

mkdir "src/$1";
touch "src/$1/index.ts";
touch "src/$1/helpers.ts";


echo """import { init } from '../lib';

const [WIDTH, HEIGHT] = [2160, 3890];
// const [WIDTH, HEIGHT] = [11811, 17717];

function paint(ctx: CanvasRenderingContext2D) {
  // CODE HERE
}

setTimeout(() => {
  console.clear();
  const ctx = init(WIDTH, HEIGHT);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  paint(ctx);
});

""" > "src/$1/index.ts";

echo "Done!";
