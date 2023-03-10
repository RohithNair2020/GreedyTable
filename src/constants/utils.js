import lodash from "lodash";
import numbro from "numbro";

export const isArrayValidAndNotEmpty = (value) => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return false;
    }
    return true;
  }
  return false;
};

export const isObjectValidAndNotEmpty = (value) => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return true;
  } else {
    return false;
  }
};

export const getStringFromObject = (string, obj, defaultValue = "") =>
  lodash.get(obj, string, defaultValue);

export const makeCurrency = (value) => {
  return numbro(Number(value)).formatCurrency({ mantissa: 2 });
};

export const makeNumber = (value) => {
  const formatedNum = numbro(value).format({
    totalLength: 3,
    average: true,
    spaceSeparated: true,
  });
  return formatedNum.toUpperCase();
};

export const makePercentage = (value) => {
  return numbro(value).format({ output: "percent", mantissa: 1 });
};
