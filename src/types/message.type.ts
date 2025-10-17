export type Message = {
  avatar: string;
  character: string;
  text: string;
  time?: string;
  reactions?: { emoji: string; count: number }[];
  role?: string; // ex: BOT
};