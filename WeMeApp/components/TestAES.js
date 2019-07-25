import { NativeModules } from "react-native";

const TestAES = () => {
  var Aes = NativeModules.Aes;

  const generateKey = (password, salt, cost, length) =>
    Aes.pbkdf2(password, salt, cost, length);

  const encrypt = (text, keyBase64) => {
    return Aes.randomKey(16).then(iv => {
      console.log("IV: ", iv);
      return Aes.encrypt(text, keyBase64, iv).then(cipher => ({
        cipher,
        iv
      }));
    });
  };
  const decrypt = (encryptedData, key) =>
    Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);

  try {
    // generateKey("Arnold", "salt", 5000, 128).then(key => {
    //   console.log("Key:", key);
    //   encrypt("These violent delights have violent ends", key)
    //     .then(encryptedData => {
    //       console.log("Encrypted:", encryptedData.cipher);

    const encryptedData = {
      cipher: "R6tiqhAcVqz9qKh3j8mt7w==",
      iv: "ed9b42f26f60e9b6e25e6d03355571b7"
    };

    const key = "c1daf76b53c4cd959d5fef5c89b2af02";

    decrypt(encryptedData, key)
      .then(text => {
        console.log("Decrypted:", text);
      })
      .catch(error => {
        console.log(error);
      });

    // Aes.hmac256(encryptedData.cipher, key).then(hash => {
    //   console.log("HMAC", hash);
    // });
    // })
    // .catch(error => {
    //   console.log("Errror????");
    //   console.log(error);
    //       });
    //   });
  } catch (e) {
    console.error(e);
  }
  return null;
};

export default TestAES;
