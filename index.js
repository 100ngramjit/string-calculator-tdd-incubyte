function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /[,\n]/;
  if (numbers.startsWith("//")) {
    const delimiterEnd = numbers.indexOf("\n");
    const delimiterDef = numbers.substring(2, delimiterEnd);

    if (delimiterDef.startsWith("[") && delimiterDef.endsWith("]")) {
      const delimiters = [];
      let i = 0;

      while (i < delimiterDef.length) {
        if (delimiterDef[i] === "[") {
          const end = delimiterDef.indexOf("]", i);
          if (end !== -1) {
            const delim = delimiterDef.substring(i + 1, end);
            delimiters.push(delim);
            i = end + 1;
          } else {
            break;
          }
        } else {
          i++;
        }
      }

      if (delimiters.length > 0) {
        const escapedDelimiters = delimiters.map((d) =>
          d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        );
        const delimiterPattern = escapedDelimiters.join("|");
        delimiter = new RegExp(delimiterPattern);
      }
    } else {
      delimiter = new RegExp(
        delimiterDef.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      );
    }
    numbers = numbers.substring(delimiterEnd + 1);
  }

  const nums = numbers.split(delimiter).map((num) => parseInt(num));
  const negatives = nums.filter((num) => num < 0);

  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
  }

  return nums.filter((num) => num <= 1000).reduce((sum, num) => sum + num, 0);
}

module.exports = { add };
