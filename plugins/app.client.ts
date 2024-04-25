declare global {
  interface Window {
    __session_id__: string;
    __webSocketClient: WebSocket;
  }
}

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

window.__session_id__ = generateSessionId(48);

if (!(window.__webSocketClient instanceof WebSocket)) {
  window.__webSocketClient = new WebSocket(
    `${API_SOCKET}${window.__session_id__}`
  );
} else if (
  window.__webSocketClient.readyState === WebSocket.CLOSED ||
  window.__webSocketClient.readyState === WebSocket.CLOSING
) {
  window.__webSocketClient = new WebSocket(
    `${API_SOCKET}${window.__session_id__}`
  );
}

export default defineNuxtPlugin((nuxtApp) => {
  const ws = window.__webSocketClient;
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
      session_id: window.__session_id__,
      ws: ws,
    },
  };
});
