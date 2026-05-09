import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { getGuildConfig } from "../services/guildConfig";

export default async function onGuildMemberAdd(member: GuildMember) {
  const config = getGuildConfig(member.guild.id);

  if (!config.welcomeChannelId) return;

  const channel = member.guild.channels.cache.get(config.welcomeChannelId);

  if (!channel || !(channel instanceof TextChannel)) return;

  const rulesChannel = config.rulesChannelId
    ? member.guild.channels.cache.get(config.rulesChannelId)
    : null;

  const mysticsBanner =
    process.env.MYSTICS_BANNER_URL ||
    "https://cdn.jsdelivr.net/gh/arifwardan/mysu/assets/banner.jpg";

  const embed = new EmbedBuilder()
    .setColor("#B9A7FF")
    .setTitle("Welcome to Mystics United")
    .setDescription(
      [
        `Welcome ${member} to **Mystics United**.`,
        "",
        "We're glad to have you here.",
        rulesChannel
          ? `Please read the rules in ${rulesChannel}.`
          : "Please take a moment to read the server rules.",
      ].join("\n"),
    )
    .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
    .setImage(mysticsBanner)
    .setFooter({
      text: `Member #${member.guild.memberCount}`,
    })
    .setTimestamp();

  if (config.bannerUrl) {
    embed.setImage(config.bannerUrl);
  }

  await channel.send({ embeds: [embed] });
}
