declare const AddonName: string;
declare interface ITextureConfig {
    color: IColor;
    texture: string;
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    scale: number;
    alpha: number;
}
/** Does a native lua atan2 call, we need to use this because the transpiller will otherwise mess it up */
declare function DoAtan2(this: void, x: number, y: number): number;
/** Does a native Math.random lua call, this is different from the Typescript version of Math.Random as we can set min/max params */
declare function DoMathRan(this: void, Min: number, Max: number): number;
