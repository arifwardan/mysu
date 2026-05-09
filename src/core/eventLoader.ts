import { Client } from "discord.js";
import onGuildMemberAdd from "../events/guildMemberAdd";
import onMessageCreate from "../events/messageCreate";
import onReady from "../events/ready";

export async function loadEvents(client: Client) {
  client.once("clientReady", () => onReady(client));

  client.on("guildMemberAdd", async (member) => {
    await onGuildMemberAdd(member);
  });

  client.on("messageCreate", async (message) => {
    await onMessageCreate(client, message);
  });
}