import { NativeModules } from "react-native";

// return promise, key
export function generateKey() {
  const Aes = NativeModules.Aes;
  const password = Math.random()
    .toString(32)
    .substring(2);
  const salt = Math.random()
    .toString(32)
    .substring(2);
  const cost = 5000;
  const length = 128; // 128 || 192 || 256, 256 increase ~40% runtime for generation.
  return Aes.pbkdf2(password, salt, cost, length);
}

// return promise, encryptedData ({ cipher, iv })
export function encryptMessage(message, keyBase64) {
  const Aes = NativeModules.Aes;
  return Aes.randomKey(16).then(iv => {
    return Aes.encrypt(message, keyBase64, iv).then(cipher => ({
      cipher,
      iv
    }));
  });
}

// return promise, message
export function decryptMessage(encryptedData, key) {
  Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);
}
