export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.__session_id__ = generateSessionId(48);
  const ws = new WebSocket(`${API_SOCKET}${nuxtApp.__session_id__}`);

  ws.onopen = () => {
    console.log(
      "%c Socket Open !!!",
      "background:#ff9800; color: #FFFFFF; font-size: 20px; font-weight: 800; border-radius: 10px; padding: 2px 0.5em;"
    );
  };

  ws.onerror = () => {
    console.log("Error socket");
  };

  ws.onclose = () => {
    console.log(
      "%c Socket Close !!!",
      "background:#ff9800; color: #FFFFFF; font-size: 20px; font-weight: 800; border-radius: 10px; padding: 2px 0.5em;"
    );
  };

  return {
    provide: {
      session_id: nuxtApp.__session_id__,
      ws: ws,
    },
  };
});

const generateSessionId = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
