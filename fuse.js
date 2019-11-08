const painting = process.argv[2];

const { FuseBox, WebIndexPlugin } = require('fuse-box');
const fuse = FuseBox.init({
  homeDir: 'src',
  target: 'browser@es6',
  output: 'dist/$name.js',
  plugins: [WebIndexPlugin({ template: 'src/index.html' })],
});
fuse.dev();
fuse
  .bundle('app')
  .instructions(` > ${painting}/index.ts`)
  .hmr()
  .watch();
fuse.run();
