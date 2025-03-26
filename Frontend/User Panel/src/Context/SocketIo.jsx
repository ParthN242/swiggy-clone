import { io } from "socket.io-client";
import { useContext, createContext, useEffect, useState } from "react";
import {
  addRestaurants,
  deleteRestaurant,
  setRestaurants,
} from "../Redux/appSlice";
import { useDispatch } from "react-redux";

const SocketContext = createContext(null);

const SocketIo = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io("http://localhost:4000");

    setSocket(newSocket);

    newSocket.on("add-new-restaurant", (newRestaurant) => {
      dispatch(addRestaurants(newRestaurant));
    });

    newSocket.on("delete-restaurant", (deleteResId) => {
      dispatch(deleteRestaurant(deleteResId));
    });

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export default SocketIo;
