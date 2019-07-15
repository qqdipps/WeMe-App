import axios from "axios";
import Realm from "realm";

export function setupScript(socket, schema, displayName) {
  const params = { user: { setup: true } };
  let connectionId;
  axios
    .post("http://192.168.1.12:4000/api/users", params, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      response = response.data.data;
      Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
        .then(realm => {
          realm.write(() => {
            realm.deleteAll();
            const user = realm.create("UserSelf", {
              userId: response.user_id,
              displayName: displayName
            });
            user.channels.push(response.connection_id);
            let users = realm.objects("UserSelf");
            console.log(users);
            channel = socket.channel(`beam:response.connection_id`, {
              connection_id: response.connection_id,
              user_id: response.user_id,
              link_id: response.link_id
            });
            channel
              .join()
              .receive("ok", resp => {
                console.log(
                  "Joined successfully channel: ",
                  channel.params(),
                  channel.params().connection_id
                );
              })
              .receive("error", resp => {
                console.log("Unable to join", resp);
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
  return null;
}
