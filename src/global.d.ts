export {};

declare global {
  interface Window {
    api: {
      ping: () => void;
      send: (channel: string, data?: any) => void;
      on: (channel: string, callback: (data: any) => void) => void;
    };
  }
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
