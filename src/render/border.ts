import {Path} from './path';
import {BoundCurves} from './bound-curves';
import {isBezierCurve} from './bezier-curve';

export const parsePathForBorder = (curves: BoundCurves, borderSide: number): Path[] => {
    switch (borderSide) {
        case 0:
            return createPathFromCurves(
                curves.topLeftBorderBox,
                curves.topLeftPaddingBox,
                curves.topRightBorderBox,
                curves.topRightPaddingBox
            );
        case 1:
            return createPathFromCurves(
                curves.topRightBorderBox,
                curves.topRightPaddingBox,
                curves.bottomRightBorderBox,
                curves.bottomRightPaddingBox
            );
        case 2:
            return createPathFromCurves(
                curves.bottomRightBorderBox,
                curves.bottomRightPaddingBox,
                curves.bottomLeftBorderBox,
                curves.bottomLeftPaddingBox
            );
        case 3:
        default:
            return createPathFromCurves(
                curves.bottomLeftBorderBox,
                curves.bottomLeftPaddingBox,
                curves.topLeftBorderBox,
                curves.topLeftPaddingBox
            );
    }
};

export const parsePathForBorderDoubleOuter = (curves: BoundCurves, borderSide: number): Path[] => {
    switch (borderSide) {
        case 0:
            return createPathFromCurves(
                curves.topLeftBorderBox,
                curves.topLeftBorderDoubleOuterBox,
                curves.topRightBorderBox,
                curves.topRightBorderDoubleOuterBox
            );
        case 1:
            return createPathFromCurves(
                curves.topRightBorderBox,
                curves.topRightBorderDoubleOuterBox,
                curves.bottomRightBorderBox,
                curves.bottomRightBorderDoubleOuterBox
            );
        case 2:
            return createPathFromCurves(
                curves.bottomRightBorderBox,
                curves.bottomRightBorderDoubleOuterBox,
                curves.bottomLeftBorderBox,
                curves.bottomLeftBorderDoubleOuterBox
            );
        case 3:
        default:
            return createPathFromCurves(
                curves.bottomLeftBorderBox,
                curves.bottomLeftBorderDoubleOuterBox,
                curves.topLeftBorderBox,
                curves.topLeftBorderDoubleOuterBox
            );
    }
};

export const parsePathForBorderDoubleInner = (curves: BoundCurves, borderSide: number): Path[] => {
    switch (borderSide) {
        case 0:
            return createPathFromCurves(
                curves.topLeftBorderDoubleInnerBox,
                curves.topLeftPaddingBox,
                curves.topRightBorderDoubleInnerBox,
                curves.topRightPaddingBox
            );
        case 1:
            return createPathFromCurves(
                curves.topRightBorderDoubleInnerBox,
                curves.topRightPaddingBox,
                curves.bottomRightBorderDoubleInnerBox,
                curves.bottomRightPaddingBox
            );
        case 2:
            return createPathFromCurves(
                curves.bottomRightBorderDoubleInnerBox,
                curves.bottomRightPaddingBox,
                curves.bottomLeftBorderDoubleInnerBox,
                curves.bottomLeftPaddingBox
            );
        case 3:
        default:
            return createPathFromCurves(
                curves.bottomLeftBorderDoubleInnerBox,
                curves.bottomLeftPaddingBox,
                curves.topLeftBorderDoubleInnerBox,
                curves.topLeftPaddingBox
            );
    }
};

export const parsePathForBorderStroke = (curves: BoundCurves, borderSide: number): Path[] => {
    switch (borderSide) {
        case 0:
            return createStrokePathFromCurves(curves.topLeftBorderStroke, curves.topRightBorderStroke);
        case 1:
            return createStrokePathFromCurves(curves.topRightBorderStroke, curves.bottomRightBorderStroke);
        case 2:
            return createStrokePathFromCurves(curves.bottomRightBorderStroke, curves.bottomLeftBorderStroke);
        case 3:
        default:
            return createStrokePathFromCurves(curves.bottomLeftBorderStroke, curves.topLeftBorderStroke);
    }
};

const createStrokePathFromCurves = (outer1: Path, outer2: Path): Path[] => {
    const path = [];
    if (isBezierCurve(outer1)) {
        path.push(outer1.subdivide(0.5, false));
    } else {
        path.push(outer1);
    }

    if (isBezierCurve(outer2)) {
        path.push(outer2.subdivide(0.5, true));
    } else {
        path.push(outer2);
    }

    return path;
};

export const renderDottedLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    interval: number,
    context: CanvasRenderingContext2D,
    color: string,
    offset: number
) => {
    if (!interval) {
        interval = 5;
    }
    let isHorizontal = true;
    if (x1 == x2) {
        isHorizontal = false;
    }
    const len = isHorizontal ? x2 - x1 : y2 - y1;
    context.moveTo(x1, y1);
    context.fillStyle = color;
    let progress = 0;
    const r = Math.abs(interval) / 2;
    while (Math.abs(len) > Math.abs(progress)) {
        if (isHorizontal) {
            context.beginPath();
            context.moveTo(x1 + progress + offset, y1 + offset);
            context.arc(x1 + progress + offset, y1 + offset, r, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
        } else {
            context.beginPath();
            context.moveTo(x1 + offset, y1 + progress + offset);
            context.arc(x1 + offset, y1 + progress - offset, r, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
        }
        progress += interval * 2;
    }
};
const createPathFromCurves = (outer1: Path, inner1: Path, outer2: Path, inner2: Path): Path[] => {
    const path = [];
    if (isBezierCurve(outer1)) {
        path.push(outer1.subdivide(0.5, false));
    } else {
        path.push(outer1);
    }

    if (isBezierCurve(outer2)) {
        path.push(outer2.subdivide(0.5, true));
    } else {
        path.push(outer2);
    }

    if (isBezierCurve(inner2)) {
        path.push(inner2.subdivide(0.5, true).reverse());
    } else {
        path.push(inner2);
    }

    if (isBezierCurve(inner1)) {
        path.push(inner1.subdivide(0.5, false).reverse());
    } else {
        path.push(inner1);
    }

    return path;
};
