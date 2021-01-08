import { Path } from './path';
import { BoundCurves } from './bound-curves';
export declare const parsePathForBorder: (curves: BoundCurves, borderSide: number) => Path[];
export declare const parseWidthForDashedAndDottedBorder: (paths: any[], borderSide: number) => any;
export declare const renderDottedLine: (x1: number, y1: number, x2: number, y2: number, interval: number, context: CanvasRenderingContext2D, color: string, offset: number) => void;
