// import "dotenv/config";
// import { Client, Collection, GatewayIntentBits, Message } from "discord.js";
// import { loadCommands } from "./core/commandLoader";
// import { loadEvents } from "./core/eventLoader";
// import express from "express";

// const app = express();
// app.use(express.json());

// export interface Command {
//   name: string;
//   execute: (message: Message, args: string[]) => Promise<void>;
// }

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.GuildMembers,
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.GuildVoiceStates,
//   ],
// });

// (client as any).commands = new Collection();

// async function bootstrap() {
//   await loadCommands(client);
//   await loadEvents(client);

//   await client.login(process.env.TOKEN);
// }

// bootstrap();

import "dotenv/config";

import express from "express";

import {
  Client,
  Collection,
  GatewayIntentBits,
  Message
} from "discord.js";

import { loadCommands } from "./core/commandLoader";
import { loadEvents } from "./core/eventLoader";

import robloxRoutes from "./routes/roblox";
import { addMessage } from "./services/robloxBridge";

export interface Command {
  name: string;
  execute: (message: Message, args: string[]) => Promise<void>;
}

const app = express();

app.use(express.json());

app.use("/", robloxRoutes);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

(client as any).commands = new Collection();

const MC_CHAT_BOT_ID = process.env.MC_CHAT_BOT_ID!;

client.on("messageCreate", (msg) => {
  if (msg.channelId !== MC_CHAT_BOT_ID || msg.author.bot) return;

  addMessage(
    msg.author.username,
    msg.content
  );
});

async function bootstrap() {
  await loadCommands(client);
  await loadEvents(client);

  app.listen(3000, () => {
    console.log("Express server running on port 3000");
  });

  await client.login(process.env.TOKEN);
}

bootstrap();