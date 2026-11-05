/**
 * Chuẩn hóa chuỗi để tìm kiếm không phân biệt dấu/hoa thường.
 * "Hà Nội" -> "ha noi", "TP. Hồ Chí Minh" -> "tp ho chi minh"
 */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu thanh/dấu mũ
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
