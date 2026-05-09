import { Client, Message } from "discord.js";

export default async function onMessageCreate(
  client: Client,
  message: Message
) {
  if (message.author.bot) return;

  const prefix = process.env.PREFIX || "my!";

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  const command = (client as any).commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(err);
    await message.reply("Terjadi error saat menjalankan command.");
  }
}