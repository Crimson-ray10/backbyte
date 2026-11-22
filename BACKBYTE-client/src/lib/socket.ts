import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '@/types/socket';

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: AppSocket | null = null;

export function getSocket(token?: string): AppSocket {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
  if (!socket) {
    socket = io(url, {
      auth: { token },
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'],
    });
  }
  if (token) {
    socket.auth = { token };
  }
  return socket;
}

export function connectSocket(token: string): AppSocket {
  const s = getSocket(token);
  s.auth = { token };
  if (!s.connected) {
    s.connect();
  }
  return s;
}

export function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}
