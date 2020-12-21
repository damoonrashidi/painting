const { FuseBox, WebIndexPlugin, CopyPlugin } = require('fuse-box');

const painting = process.argv[2];

const fuse = FuseBox.init({
  homeDir: 'src',
  target: 'browser@es6',
  output: 'dist/$name.js',
  plugins: [
    CopyPlugin({ files: ['*.jpg'], dest: 'static' }),
    WebIndexPlugin({ template: 'src/index.html' }),
  ],
});
fuse.dev();
fuse.bundle('app').instructions(` > ${painting}/index.ts`).hmr().watch();
fuse.run();
