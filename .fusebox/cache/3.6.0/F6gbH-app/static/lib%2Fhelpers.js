module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction init(width, height) {\n    document.body.innerHTML = '';\n    const canvas = document.createElement('canvas');\n    canvas.width = width;\n    canvas.height = height;\n    document.body.appendChild(canvas);\n    let ctx = canvas.getContext('2d');\n    ctx.imageSmoothingEnabled = true;\n    return ctx;\n}\nexports.init = init;\nexports.random = (min = 0, max = 100, rounded = true) => rounded\n    ? Math.floor(Math.random() * (max - min) + min)\n    : Math.random() * (max - min) + min;\nexports.middle = ([x1, y1], [x2, y2]) => [\n    (x1 + x2) / 2,\n    (y1 + y2) / 2,\n];\nfunction distort(points, jitter = 5, iteration = 0) {\n    let newPoints = [];\n    for (let i = 1; i < points.length; i++) {\n        newPoints.push(points[i]);\n        const [x, y] = exports.middle(points[i], points[i + 1] || points[1]);\n        newPoints.push([x + exports.random(-jitter, jitter), y + exports.random(-jitter, jitter)]);\n    }\n    return iteration > 3 ? points : distort(newPoints, jitter, iteration + 1);\n}\nexports.distort = distort;\n//# sourceMappingURL=helpers.js.map",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1542981784022,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
