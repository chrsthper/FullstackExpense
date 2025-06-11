// __tests__/formatRupiah.test.js
// Tujuan: menguji fungsi formatRupiah dari utils.js

import { formatRupiah } from "../public/js/utils.js";

describe("formatRupiah", () => {
  test("formats 1000 as Rp 1.000", () => {
    expect(formatRupiah(1000)).toBe("Rp 1.000");
  });

  test("formats 250000 as Rp 250.000", () => {
    expect(formatRupiah(250000)).toBe("Rp 250.000");
  });

  test("formats 0 as Rp 0", () => {
    expect(formatRupiah(0)).toBe("Rp 0");
  });

  test("formats string input correctly", () => {
    expect(formatRupiah("5000")).toBe("Rp 5.000");
  });
});
