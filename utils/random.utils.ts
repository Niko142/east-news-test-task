// Генерация псевдослучайных чисел с помощью алгоритма LCG
export function createSeededRandom(seed: number) {
  let current = seed;

  return function next(): number {
    current = (current * 1664525 + 1013904223) & 0xffffffff;
    return (current >>> 0) / 0xffffffff;
  };
}
