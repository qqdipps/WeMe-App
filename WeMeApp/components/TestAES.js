import { NativeModules } from "react-native";

const TestAES = () => {
  var Aes = NativeModules.Aes;

  const generateKey = (password, salt, cost, length) =>
    Aes.pbkdf2(password, salt, cost, length);

  const encrypt = (text, keyBase64) => {
    return Aes.randomKey(32).then(iv => {
      return Aes.encrypt(text, keyBase64, iv).then(cipher => ({
        cipher,
        iv
      }));
    });
  };
  const decrypt = (encryptedData, key) =>
    Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);

  try {
    generateKey("Arnold", "salt", 5000, 128).then(key => {
      console.log("Key:", key);
      encrypt("These violent delights have violent ends", key)
        .then(({ cipher, iv }) => {
          console.log("Encrypted:", cipher);

          decrypt({ cipher, iv }, key)
            .then(text => {
              console.log("Decrypted:", text);
            })
            .catch(error => {
              console.log(error);
            });

          Aes.hmac256(cipher, key).then(hash => {
            console.log("HMAC", hash);
          });
        })
        .catch(error => {
          console.log("Errror????");
          console.log(error);
        });
    });
  } catch (e) {
    console.error(e);
  }
  return null;
};

export default TestAES;
