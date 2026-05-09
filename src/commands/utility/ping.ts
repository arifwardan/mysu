export default {
  name: "ping",

  async execute(message: any) {
    await message.reply("pong");
  },
};