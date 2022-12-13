export const isArrayValidAndNotEmpty = (value) => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return false;
    }
    return true;
  }
  return false;
};
