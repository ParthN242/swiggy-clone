const filterFood = (foodItems, filter) => {
  const filterFoodItems = foodItems.filter((item) => {
    if (filter !== "menu") return item.category === filter;
    else return item;
  });

  return filterFoodItems;
};

export default filterFood;
