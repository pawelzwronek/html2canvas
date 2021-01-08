"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bezier_curve_1 = require("./bezier-curve");
exports.parsePathForBorder = function (curves, borderSide) {
    switch (borderSide) {
        case 0:
            return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
        case 1:
            return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
        case 2:
            return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
        case 3:
        default:
            return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
    }
};
exports.parseWidthForDashedAndDottedBorder = function (paths, borderSide) {
    var topLeft = bezier_curve_1.isBezierCurve(paths[0]) ? paths[0].start : paths[0];
    var topRight = bezier_curve_1.isBezierCurve(paths[1]) ? paths[1].start : paths[1];
    var bottomRight = bezier_curve_1.isBezierCurve(paths[2]) ? paths[2].start : paths[2];
    var bottomLeft = bezier_curve_1.isBezierCurve(paths[3]) ? paths[3].start : paths[3];
    switch (borderSide) {
        case 0:
            return {
                width: topRight['x'] - topLeft['x'],
                space: bottomRight['y'] - topRight['y'],
                startPos: topLeft
            };
        case 1:
            return {
                width: topRight['y'] - topLeft['y'],
                space: topRight['x'] - bottomRight['x'],
                startPos: topLeft
            };
        case 2:
            return {
                width: topLeft['x'] - topRight['x'],
                space: topRight['y'] - bottomLeft['y'],
                startPos: topLeft
            };
        case 3:
            return {
                width: topLeft['y'] - topRight['y'],
                space: bottomLeft['x'] - topRight['x'],
                startPos: topLeft
            };
    }
};
exports.renderDottedLine = function (x1, y1, x2, y2, interval, context, color, offset) {
    if (!interval) {
        interval = 5;
    }
    var isHorizontal = true;
    if (x1 == x2) {
        isHorizontal = false;
    }
    var len = isHorizontal ? x2 - x1 : y2 - y1;
    context.moveTo(x1, y1);
    context.fillStyle = color;
    var progress = 0;
    var r = Math.abs(interval) / 2;
    while (Math.abs(len) > Math.abs(progress)) {
        if (isHorizontal) {
            context.beginPath();
            context.moveTo(x1 + progress + offset, y1 + offset);
            context.arc(x1 + progress + offset, y1 + offset, r, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
        }
        else {
            context.beginPath();
            context.moveTo(x1 + offset, y1 + progress + offset);
            context.arc(x1 + offset, y1 + progress - offset, r, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
        }
        progress += interval * 2;
    }
};
var createPathFromCurves = function (outer1, inner1, outer2, inner2) {
    var path = [];
    if (bezier_curve_1.isBezierCurve(outer1)) {
        path.push(outer1.subdivide(0.5, false));
    }
    else {
        path.push(outer1);
    }
    if (bezier_curve_1.isBezierCurve(outer2)) {
        path.push(outer2.subdivide(0.5, true));
    }
    else {
        path.push(outer2);
    }
    if (bezier_curve_1.isBezierCurve(inner2)) {
        path.push(inner2.subdivide(0.5, true).reverse());
    }
    else {
        path.push(inner2);
    }
    if (bezier_curve_1.isBezierCurve(inner1)) {
        path.push(inner1.subdivide(0.5, false).reverse());
    }
    else {
        path.push(inner1);
    }
    return path;
};
//# sourceMappingURL=border.js.map