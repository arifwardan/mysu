import { EmbedBuilder, TextChannel } from "discord.js";

export default {
  name: "rules",

  async execute(message: any) {
    const channelId = process.env.RULES_CHANNEL_ID;

    if (!channelId) {
      await message.reply("RULES_CHANNEL_ID belum diatur di .env");
      return;
    }

    const channel = message.guild?.channels.cache.get(channelId);

    if (!channel || !(channel instanceof TextChannel)) {
      await message.reply("Rules channel tidak ditemukan.");
      return;
    }

    const embed = new EmbedBuilder()
      .setColor("#B9A7FF") // ungu muda mirip maskot
      .setTitle("Mystics United — Server Rules")
      .setDescription(
        [
          "Please take a moment to read the rules below.",
          "",
          "**1. No spam or flooding**",
          "Avoid excessive messages, repeated text, emoji spam, or mention spam.",
          "",
          "**2. No phishing or suspicious links**",
          "Scam links, fake giveaways, malware, and fake login pages are prohibited.",
          "",
          "**3. No hate speech or racism**",
          "Discrimination, racism, and hateful language are not allowed.",
          "",
          "**4. No NSFW or sexual content**",
          "Sexual, pornographic, or inappropriate content is prohibited.",
          "",
          "**5. No cheats, exploits, or hacks**",
          "Do not share cheats, exploits, illegal scripts, or malicious tools.",
          "",
          "**6. No harassment or toxic behavior**",
          "Respect others. Personal attacks and deliberate provocation are not welcome.",
          "",
          "**7. Stay on topic**",
          "Use channels for their intended purpose.",
          "",
          "**8. No impersonation**",
          "Do not pretend to be staff or another member.",
          "",
          "**9. Respect staff decisions**",
          "Moderator decisions should be respected.",
          "",
          "**10. Use common sense**",
          "Help keep the community friendly and enjoyable for everyone."
        ].join("\n")
      )
      .setFooter({
        text: "By staying in Mystics United, you agree to follow these rules.",
      });

    await channel.send({ embeds: [embed] });
    await message.reply("Rules berhasil dikirim.");
  },
};