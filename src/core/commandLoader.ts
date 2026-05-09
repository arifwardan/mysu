import fs from "fs";
import path from "path";
import { Client, Collection } from "discord.js";
import { Command } from "../types/Command";

export async function loadCommands(client: Client) {
  (client as any).commands = new Collection<string, Command>();

  const commandsPath = path.join(__dirname, "..", "commands");

  function walk(dir: string) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!fullPath.endsWith(".ts") && !fullPath.endsWith(".js")) continue;

      const command = require(fullPath).default as Command;

      if (!command?.name || !command?.execute) continue;

      (client as any).commands.set(command.name, command);

      console.log(`Loaded command: ${command.name}`);
    }
  }

  walk(commandsPath);
}