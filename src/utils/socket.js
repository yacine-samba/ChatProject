import { io } from "socket.io-client";

export const socket = io("http://localhost:8000/", {
  autoConnect: false,
});

// export const socket = io("https://socket-io-api-two.vercel.app:8000/", {
//   autoConnect: false,
// });

socket.onAny((event, ...args) => {
    console.log("event received", event, args);
  });
