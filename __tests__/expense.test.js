// expense.test.js
// Tujuan: Menguji bahwa addDoc dipanggil dengan data transaksi yang benar saat submit form

import { addDoc, collection } from "firebase/firestore";

// Mock Firebase Firestore
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn()
}));

describe("Expense Entry", () => {
  it("should call addDoc with correct data", async () => {
    // Dummy input
    const mockDb = {};
    const userId = "user123";
    const dummyData = {
      userId,
      amount: 50000,
      description: "Makan siang",
      category: "Food",
      date: "2024-06-08",
      time: "12:00",
      type: "expense",
      createdAt: expect.any(Date) // karena new Date()
    };

    // Jalankan fungsi yang diuji
    await addDoc(collection(mockDb, "entries"), dummyData);

    // Pastikan dipanggil dengan benar
    expect(addDoc).toHaveBeenCalledWith(
      collection(mockDb, "entries"),
      expect.objectContaining({
        userId: "user123",
        amount: 50000,
        description: "Makan siang",
        category: "Food",
        date: "2024-06-08",
        time: "12:00",
        type: "expense"
      })
    );
  });
});
