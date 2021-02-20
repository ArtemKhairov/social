export const updateObjectInArray = (item, itemId, propName, newProps) => {
  return item.map((i) => {
    if (i[propName] === itemId) {
      return { ...i, ...newProps };
    }
    return i;
  });
};
