import "dotenv/config";
import { Client, Collection, GatewayIntentBits, Message } from "discord.js";
import fs from "fs";
import path from "path";
import onGuildMemberAdd from "./events/guildMemberAdd";

export interface Command {
  name: string;
  execute: (message: Message, args: string[]) => Promise<void>;
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

(client as any).commands = new Collection<string, Command>();

const commandsPath = path.join(__dirname, "commands");

function loadCommands(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      loadCommands(fullPath);
      continue;
    }

    if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".js")) continue;

    const command = require(fullPath).default;

    if (!command?.name || !command?.execute) continue;

    (client as any).commands.set(command.name, command);

    console.log(`Loaded command: ${command.name}`);
  }
}

client.once("clientReady", () => {
  console.log(`MYSU online sebagai ${client.user?.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  await onGuildMemberAdd(member);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const prefix = process.env.PREFIX || "my!";

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  const command = (client as any).commands.get(commandName);

  if (!command) {
    console.log(`Command tidak ditemukan: ${commandName}`);
    return;
  }

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(err);
    await message.reply("Terjadi error saat menjalankan command.");
  }
});

loadCommands(commandsPath);

client.login(process.env.TOKEN);