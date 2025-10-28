export {};

declare global {
  interface Window {
    api: {
      ping: () => void;
      send: (channel: string, data?: unknown) => void;
      on: (channel: string, callback: (data: unknown) => void) => void;
    };
    testReact?: () => void;
  }
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
