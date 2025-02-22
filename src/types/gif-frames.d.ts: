declare module 'gif-frames' {
  interface Frame {
    frameInfo: {
      width: number;
      height: number;
    };
    getImage(): HTMLCanvasElement;
  }

  function gifFrames(options: {
    url: string;
    frames: 'all' | number[];
    outputType: string;
  }): Promise<Frame[]>;

  export = gifFrames;
}
