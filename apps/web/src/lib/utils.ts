export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatNumberWithSuffix = (num: number) => {
  // trillion
  if (num >= 1e12) return (num / 1e12).toFixed(1) + "T";
  // billion
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  // million
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  // thousand
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
};

export const formatNumberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// en-IN
export const formatIndianNumberWithCommas = (num: number) => {
  return num.toLocaleString("en-IN");
};
