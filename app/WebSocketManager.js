let socketInstance = null;

export const getWebSocket = (url) => {
  if (!socketInstance) {
    socketInstance = new WebSocket(url);
  }
  return socketInstance;
};

export const closeWebSocket = () => {
  if (socketInstance) {
    socketInstance.close();
    socketInstance = null;
  }
};
