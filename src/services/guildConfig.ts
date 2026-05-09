import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "..", "data", "guildConfig.json");

type GuildConfig = {
  rulesChannelId?: string;
  welcomeChannelId?: string;
  announceChannelId?: string;
  voiceChannelId?: string;
  bannerUrl?: string;
};

type ConfigMap = Record<string, GuildConfig>;

function readConfig(): ConfigMap {
  if (!fs.existsSync(configPath)) return {};
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

function writeConfig(config: ConfigMap) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export function getGuildConfig(guildId: string): GuildConfig {
  const config = readConfig();
  return config[guildId] || {};
}

export function updateGuildConfig(
  guildId: string,
  data: Partial<GuildConfig>
) {
  const config = readConfig();

  config[guildId] = {
    ...(config[guildId] || {}),
    ...data,
  };

  writeConfig(config);
}