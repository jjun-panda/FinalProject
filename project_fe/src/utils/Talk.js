import ChannelService from "./ChannelService";

const Talk = () => {
  const talkKey = process.env.REACT_APP_CHANNEL_SERVICE
  
  ChannelService.loadScript();

  ChannelService.boot({
    "pluginKey": talkKey,
  });

  return (
    <>
    </>
  );
};

export default Talk;