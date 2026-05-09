import { Client } from "discord.js";

export default function onReady(client: Client) {
  console.log(`MYSU online sebagai ${client.user?.tag}`);
}