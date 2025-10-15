import script from '../data/script.json';

export function getNodeById(id: string) {
  return script.find((node: { id: string; }) => node.id === id);
}