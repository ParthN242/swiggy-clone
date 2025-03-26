import { io } from "socket.io-client";
import { useContext, createContext, useEffect, useState } from "react";

const SocketContext = createContext(null);

const SocketIo = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect_error", (err) => console.log("Socket Error:", err));

    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export default SocketIo;
