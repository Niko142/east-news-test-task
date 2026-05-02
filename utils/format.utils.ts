import { ImageFormat } from "@/types/common.types";

/**
 * Функция для получения пути к изображению криптовалюты
 * @param symbol - символ криптовалюты (например, BTC, ETH)
 * @param format - формат изображения (по умолчанию "png")
 * @returns строка с путем к изображению
 */
export function getImagePath(symbol: string, format: ImageFormat = "png") {
  return `/${symbol.toLowerCase()}.${format}`;
}
