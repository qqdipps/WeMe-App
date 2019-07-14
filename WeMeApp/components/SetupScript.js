import axios from "axios";
import Realm from "realm";
import React from "react";

const SetupScripts = ({ socket, schema, displayName }) => {
  const params = { user: { setup: true } };
  axios
    .post("http://192.168.1.12:4000/api/users", params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      response = response.data.data;
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
    });

  channel = socket.channel();
  return null;
};

export default SetupScripts;
