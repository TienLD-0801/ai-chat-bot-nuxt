export const useSocket = () => {
  const ws = new WebSocket("wss://hannover2.korenext.com");

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

  return { ws };
};
