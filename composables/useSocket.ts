export const useSocket = () => {
  const ws = new WebSocket("wss://hannover2.korenext.com");

  ws.onopen = () => {
    console.log("Socket Open !!!");
  };

  ws.onerror = () => {
    console.log("Error socket");
  };

  ws.onclose = () => {
    console.log("Socket Close !!!");
  };

  return { ws };
};
