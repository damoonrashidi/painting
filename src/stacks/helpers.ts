import { randomHue } from './colors';

export function init(width: number, height: number): HTMLDivElement {
  document.body.innerHTML = '';
  const canvas: HTMLDivElement = document.createElement('div');
  canvas.style.setProperty('width', `${width}px`);
  canvas.style.setProperty('height', `${height}px`);
  canvas.style.backgroundColor = '#333';
  canvas.style.boxShadow = `0 8px 16px rgba(0,0,0,.3)`;
  canvas.style.overflow = 'hidden';
  canvas.style.display = 'flex';
  canvas.style.flexDirection = 'row';
  document.body.appendChild(canvas);
  return canvas;
}

export function random(min: number = 0, max: number = 100, rounded = true) {
  return rounded
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min;
}

export function createStack(even: boolean, show: boolean): HTMLDivElement {
  const div = document.createElement('div');
  div.style.width = '10px';
  div.style.height = `${random(1, 8)}px`;
  div.style.marginBottom = `0px`;
  div.style.transform = `skewY(${even ? 50 : -50}deg)`;
  if (!show) {
    div.style.opacity = `0`;
  }
  return div;
}

export function createColumn() {
  const column = document.createElement('div');
  column.style.marginRight = `2px`;
  return column;
}
