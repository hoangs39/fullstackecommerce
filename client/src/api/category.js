import { API_URL } from "../GlobalVar";

export const getCategories = async () => {
  try {
    const response = await fetch(API_URL + "/api/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
export const allAttributes = async (categoryId) => {
  try {
    const response = await fetch(API_URL + "/api/category/allattributes/" + categoryId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const organizeCategoriesIntoTree = (categories) => {
  const categoryMap = new Map();
  const rootCategories = [];

  categories.forEach((category) => {
    category.subcategories = [];
    categoryMap.set(category._id, category);
  });

  categories.forEach((category) => {
    if (category.parent) {
      const parentCategory = categoryMap.get(category.parent);
      if (parentCategory) {
        parentCategory.subcategories.push(category);
      }
    } else {
      rootCategories.push(category);
    }
  });

  return rootCategories;
};

export const getCategoryById = async (id) =>{
  try {
    const response = await fetch(API_URL + "/api/category/" +id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}