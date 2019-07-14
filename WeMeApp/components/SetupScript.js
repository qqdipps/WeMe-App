import axios from "axios";
import Realm from "realm";
import React from "react";

const SetupScripts = ({ socket, UserSelfSchema, displayName }) => {
  console.log("HERE I AM IN THE SCRI  T**********");
  const params = { user: { setup: true } };
  axios
    .post("http://192.168.1.12:4000/api/users", params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log("HERE I AM IN THE response **********");
      console.log(response.data);
      //   response = response.data.data;
      console.log("TRYING TO CHECK SCHEMA:", UserSelfSchema);
      Realm.open({ schema: schema })
        .then(realm => {
          realm.write(() => {
            realm.create("UserSelf", {
              userId: response.user_id,
              displayName: displayName
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log("HERE I AM IN THE ERROR **********", error);
      error.response;
    });
  return null;
};

export default SetupScripts;
