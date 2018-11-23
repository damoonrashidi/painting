module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst helpers_1 = require(\"./helpers\");\nexports.default = {\n    bg: '#fffeee',\n    main: '#b54c38',\n};\nexports.randomHue = (min = 0, max = 360, opacity = 1) => `hsla(${helpers_1.random(min, max)}, 90%, 50%, ${opacity})`;\n//# sourceMappingURL=colors.js.map",
dependencies: ["./helpers"],
sourceMap: {},
headerContent: undefined,
mtime: 1542961829858,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
