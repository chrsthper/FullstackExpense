// Tujuan:
// Menguji bahwa fungsi createUserWithEmailAndPassword dipanggil dengan argumen yang benar
// Menguji bahwa fungsi setDoc Firestore dipanggil untuk menyimpan user baru

// Import fungsi Firebase yang akan di-mock
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// Mock fungsi dari Firebase Auth
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn()
}));

// Mock fungsi dari Firebase Firestore
jest.mock("firebase/firestore", () => ({
  setDoc: jest.fn(),
  doc: jest.fn(() => ({})) // ➜ tambahkan return object kosong
}));

describe("Mock Signup", () => {
  it("should call createUserWithEmailAndPassword and setDoc with correct data", async () => {
    // Setup data tiruan (dummy)
    const mockAuth = {};                // Dummy objek auth
    const mockDb = {};                  // Dummy objek database
    const mockEmail = "test@example.com";
    const mockPassword = "test123";
    const mockName = "Test User";

    // Simulasi hasil sukses dari Firebase Auth
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: "mock-uid", email: mockEmail }
    });

    // Panggil fungsi login yang dimock
    const result = await createUserWithEmailAndPassword(mockAuth, mockEmail, mockPassword);

    // Simulasi menyimpan data user ke Firestore
    await setDoc(doc(mockDb, "users", result.user.uid), {
      name: mockName,
      email: mockEmail
    });

    // Pastikan fungsi auth dipanggil dengan parameter yang benar
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, mockEmail, mockPassword);

    // Pastikan data disimpan ke Firestore dengan benar
    expect(setDoc).toHaveBeenCalledWith(
      expect.anything(),                 // Kita tidak perlu mengecek doc() return secara detail
      { name: mockName, email: mockEmail }
    );

    // Validasi email yang dikembalikan sesuai dengan input
    expect(result.user.email).toBe(mockEmail);
  });
});
