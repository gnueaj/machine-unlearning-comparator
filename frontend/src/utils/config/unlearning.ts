export function getDefaultUnlearningConfig(method: string) {
  let epoch, learning_rate, batch_size;

  if (method === "ft") {
    epoch = "5";
    learning_rate = "0.01";
    batch_size = "64";
  } else if (method === "rl") {
    epoch = "3";
    learning_rate = "0.0001";
    batch_size = "32";
  } else {
    epoch = "3";
    learning_rate = "0.0001";
    batch_size = "64";
  }

  return { epoch, learning_rate, batch_size };
}
