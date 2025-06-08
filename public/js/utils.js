// Fungsi helper untuk format angka ke bentuk mata uang Rupiah
export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}