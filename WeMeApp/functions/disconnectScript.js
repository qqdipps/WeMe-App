import axios from "axios";
import Realm from "realm";

export function disconnect(connectionId, displayName, schema, socket) {
  const channel = socket.channels.find(
    channel => channel.topic === `beam:${connectionId}`
  );
  channel.push("disconnect", {
    connectionId: connectionId,
    displayName: displayName
  });
  channel
    .leave()
    .receive("ok", resp => {
      console.log("left channel: ", connectionId);
    })
    .receive("error", resp => {
      console.log("Unable to leave", resp);
    });

  axios
    .delete(
      `https://${global.WeMeServerAddress}/api/connections/${connectionId}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => console.log("Deleted connection on WeMe Api", response))
    .catch(error => console.log("error deleting connection WeMe api", error));

  Realm.open({ schema: schema, deleteRealmIfMigrationNeeded: true })
    .then(realm => {
      realm.write(() => {
        const connectionAES = realm.objectForPrimaryKey(
          "ConnectAES",
          connectionId
        );
        const connectionMessage = realm.objectForPrimaryKey(
          "ConnectionMessages",
          connectionId
        );
        realm.delete(connectionAES);
        realm.delete(connectionMessage);
        const userSelf = realm.objects("UserSelf")[0];
        const channels = Object.keys(userSelf.channels)
          .map(key => userSelf.channels[key])
          .filter(channel => channel != connectionId);
        realm.delete(userSelf.channels);
        channels.forEach(channel => userSelf.channels.push(channel));
      });
    })
    .catch(error => console.log("Error in disconnect script (Realm)", error));
}
