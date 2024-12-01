// src/utils/pusherConfig.ts
import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Add Pusher to the global scope for Echo
global.Pusher = Pusher;

// Initialize Echo
const echo = new Echo({
  broadcaster: "pusher",
  key: "55a1778eb2e32c9ac9fa", // Replace with your Pusher App Key
  cluster: "ap1", // Replace with your Pusher App Cluster
  forceTLS: true, // Enforce TLS
});

export default echo;
