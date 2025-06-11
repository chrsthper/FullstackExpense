// Testingnya ngapain?
// Menguji bahwa fungsi signInWithEmailAndPassword() dipanggil dengan benar
// Memastikan nilai balik (response) sesuai

// login.test.js
import { signInWithEmailAndPassword } from "firebase/auth";

// Mock fungsi dari Firebase
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn()
}));

describe("Mock Login", () => {
  it("should call signInWithEmailAndPassword with correct args", async () => {
    const mockAuth = {}; // bisa apa saja karena kita mock
    const mockEmail = "test@example.com";
    const mockPassword = "test123";

    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: "12345", email: mockEmail }
    });

    const result = await signInWithEmailAndPassword(mockAuth, mockEmail, mockPassword);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, mockEmail, mockPassword);
    expect(result.user.email).toBe(mockEmail);
  });
});
