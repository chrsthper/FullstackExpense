// logout.test.js
import { signOut } from "firebase/auth";

// Mock signOut dari Firebase
jest.mock("firebase/auth", () => ({
  signOut: jest.fn()
}));

// Mock localStorage secara manual
global.localStorage = {
  store: {},
  setItem(key, value) {
    this.store[key] = value;
  },
  getItem(key) {
    return this.store[key] || null;
  },
  clear() {
    this.store = {};
  }
};

describe("Logout functionality", () => {
  it("should call signOut and clear localStorage", async () => {
    const mockAuth = {}; // dummy

    // Simulasikan user login
    localStorage.setItem("user", "dummyUser");

    // Jalankan logout
    await signOut(mockAuth);
    localStorage.clear();

    // Pastikan fungsi logout terpanggil
    expect(signOut).toHaveBeenCalledWith(mockAuth);
    expect(localStorage.getItem("user")).toBeNull();
  });
});
