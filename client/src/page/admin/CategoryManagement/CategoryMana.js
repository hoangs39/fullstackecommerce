import React, { useState, useEffect } from "react";
import {
  addCategoryAttribute,
  deleteCategory,
  createCategory,
} from "../../../api/admin";
import {
  getCategories,
  organizeCategoriesIntoTree,
} from "../../../api/category";
import CategoryCard from "./CartegoryCard";
import CategoryForm from "./CategoryForm";
import LoaderSpinner from "../../../components/LoaderSpinner";

const CategoryMana = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const allCategories = await getCategories();
    if (allCategories) {
      const organizedCategories = organizeCategoriesIntoTree(allCategories);
      setCategories(organizedCategories);
      setLoading(false);
    }
  };

  const handleAddAttribute = async (
    categoryId,
    attributeName,
    required,
    type
  ) => {
    await addCategoryAttribute(categoryId, attributeName, required, type).then(
      (res) => console.log(res)
    );
    loadCategories();
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId).then((res) => console.log(res));
    loadCategories();
  };

  const handleCreate = async () => {
    await handleCreateCategory(null, newCategoryName);
    setNewCategoryName("");
  };

  const handleCreateCategory = async (parentId, newCategoryName) => {
    if (newCategoryName) {
      await createCategory(parentId, newCategoryName);
      loadCategories();
    }
  };

  if (loading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="category-tree">
      <CategoryForm
        handleAction={{
          handleCreate: handleCreate,
          setNewCategoryName: setNewCategoryName,
        }}
      />
      <div className="mt-5">
        <h2>Category Tree</h2>
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            handleDeleteCategory={handleDeleteCategory}
            handleCreateCategory={handleCreateCategory}
            handleAddAttribute={handleAddAttribute}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryMana;
