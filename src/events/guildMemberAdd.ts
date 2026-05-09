import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";

export default async function onGuildMemberAdd(member: GuildMember) {
  const channelId = process.env.WELCOME_CHANNEL_ID;

  if (!channelId) return;

  const channel = member.guild.channels.cache.get(channelId);

  if (!channel || !(channel instanceof TextChannel)) return;

  const rulesChannelId = process.env.RULES_CHANNEL_ID;
  const rulesChannel = rulesChannelId
    ? member.guild.channels.cache.get(rulesChannelId)
    : null;

  const mysticsBanner =
    process.env.MYSTICS_BANNER_URL ||
    "https://your-image-url-here.png";

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
      ].join("\n")
    )
    .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
    .setImage(mysticsBanner)
    .setFooter({
      text: `Member #${member.guild.memberCount}`,
    })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
}