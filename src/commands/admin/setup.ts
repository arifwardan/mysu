import { PermissionsBitField } from "discord.js";
import { updateGuildConfig } from "../../services/guildConfig";

export default {
  name: "setup",

  async execute(message: any, args: string[]) {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      await message.reply("Hanya admin yang bisa menggunakan command ini.");
      return;
    }

    const key = args[0];
    const value = args[1];

    if (!key || !value) {
      await message.reply(
        "Gunakan: my!setup <rules|welcome|announce|banner> <value>"
      );
      return;
    }

    const guildId = message.guild.id;

    if (key === "rules") {
      const channel = message.mentions.channels.first();
      if (!channel) {
        await message.reply("Mention channel rules.");
        return;
      }

      updateGuildConfig(guildId, {
        rulesChannelId: channel.id,
      });

      await message.reply("Rules channel berhasil diatur.");
      return;
    }

    if (key === "welcome") {
      const channel = message.mentions.channels.first();
      if (!channel) {
        await message.reply("Mention channel welcome.");
        return;
      }

      updateGuildConfig(guildId, {
        welcomeChannelId: channel.id,
      });

      await message.reply("Welcome channel berhasil diatur.");
      return;
    }

    if (key === "announce") {
      const channel = message.mentions.channels.first();
      if (!channel) {
        await message.reply("Mention channel announcement.");
        return;
      }

      updateGuildConfig(guildId, {
        announceChannelId: channel.id,
      });

      await message.reply("Announcement channel berhasil diatur.");
      return;
    }

    if (key === "banner") {
      updateGuildConfig(guildId, {
        bannerUrl: value,
      });

      await message.reply("Banner berhasil diatur.");
      return;
    }

    await message.reply("Setting tidak dikenali.");
  },
};