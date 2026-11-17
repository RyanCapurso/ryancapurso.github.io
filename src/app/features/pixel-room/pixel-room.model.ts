export type AnimId = 'programando' | 'atencao' | 'cafeteira' | 'polvoParaRosa' | 'polvoParaAzul';

/** The three clickable things in the room. */
export type RoomObject = 'ryan' | 'cafeteira' | 'polvo';

export interface AnimSpec {
  /** Horizontal sprite strip, one frame after the other. */
  readonly src: string;
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly durations: readonly number[];
}

export interface RoomManifest {
  readonly width: number;
  readonly height: number;
  readonly background: string;
  readonly anims: Readonly<Record<AnimId, AnimSpec>>;
}

/** Clickable area of each object in room pixels: [x, y, width, height]. */
export const HOTSPOTS: Readonly<Record<RoomObject, readonly [number, number, number, number]>> = {
  ryan: [84, 42, 61, 63],
  cafeteira: [62, 78, 22, 35],
  polvo: [157, 88, 76, 68],
};
