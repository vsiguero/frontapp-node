/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const FrontAppClient = require('./dist');

const getFrontChannels = async () => {
  try {
    const frontApp = new FrontAppClient(process.env.FRONT_TOKEN);
    const channels = await frontApp.channels.get('cha_6ate');
    console.log(channels);
  } catch (err) {
    console.log(err.message);
  }
};

// getFrontChannels();

const getFrontInboxes = () => {
  const frontApp = new FrontAppClient(process.env.FRONT_TOKEN).useCallbacks();
  const callback = (err, channels) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("These channels...", channels);
  }
  return frontApp.channels.get('cha_6ate', callback);
};

getFrontInboxes();
