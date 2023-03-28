// 00:01:04.0 00:00:08.0

export const secondsToTimeString = (time: number) => {
  const localeStirngSettings = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };
  const hours = Math.floor(time / 3600).toLocaleString(
    'en-US',
    localeStirngSettings
  );
  const minutes = Math.floor(time / 60).toLocaleString(
    'en-US',
    localeStirngSettings
  );
  const seconds = Math.floor(time % 60).toLocaleString(
    'en-US',
    localeStirngSettings
  );

  return `${hours}:${minutes}:${seconds}.00`;
};
