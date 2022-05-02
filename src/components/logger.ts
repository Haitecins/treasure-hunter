const logger = (module: string, messages: any) => {
  console.log(
    `%c[${module}] %c${messages}`,
    "font-weight:bold;color:#673ab7",
    "color:inherit"
  );
};

export default logger;
