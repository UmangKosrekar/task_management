const main = (obj) => {
  const result = [];

  if (typeof obj !== "object") {
    throw new Error("Input Should Be Object");
  }

  const keys = Object.keys(obj);
  for (const key of keys) {
    if (!Array.isArray(obj[key])) {
      throw new Error("All Values should be an array");
    }
  }

  const combine = (index, current) => {
    if (index === keys.length) {
      result.push(current.join("|"));
      return;
    }

    const key = keys[index];
    const values = obj[key];

    for (const value of values) {
      combine(index + 1, [...current, value]);
    }
  };
  combine(0, []);

  return result;
};

console.log(
  main({
    color: ["red", "blue"],
    size: ["xl", "xxl", "g"]
  })
);
