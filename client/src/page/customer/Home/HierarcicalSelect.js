import React, { useState } from "react";
import { Form } from "react-bootstrap";

const categoriesData = [
  {
    id: 1,
    name: "Electronic Devices",
    subcategories: [
      {
        id: 2,
        name: "Tablet",
        subcategories: [],
      },
      {
        id: 3,
        name: "Laptops",
        subcategories: [],
      },
      {
        id: 4,
        name: "Desktops",
        subcategories: [],
      },
      {
        id: 5,
        name: "Mobile",
        subcategories: [],
      },
    ],
  },
];

function CategorySelect({
  category,
  selectedCategories,
  handleCategoryChange,
}) {
  const isSelected = selectedCategories.includes(category._id);

  const handleSelectChange = () => {
    handleCategoryChange(category._id);
  };

  return (
    <div key={category._id}>
      <Form.Check
        type="checkbox"
        id={`category-${category._id}`}
        label={category.name}
        checked={isSelected}
        onChange={handleSelectChange}
      />
      {category.subcategories.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {category.subcategories.map((subCategory) => (
            <CategorySelect
              key={subCategory._id}
              category={subCategory}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HierarchicalSelect({
  categoriesData,
  selectedCategories,
  setSelectedCategories,
}) {
  const findCategoryById = (categoryId, categories) => {
    for (const category of categories) {
      if (category._id === categoryId) {
        return category;
      }
      if (category.subcategories.length > 0) {
        const subCategory = findCategoryById(
          categoryId,
          category.subcategories
        );
        if (subCategory) {
          return subCategory;
        }
      }
    }
    return null;
  };

  const handleCategoryChange = (categoryId) => {
    const category = findCategoryById(categoryId, categoriesData);
    if (!selectedCategories.includes(categoryId)) {
      let newSelectedCategories = [
        ...selectedCategories,
        ...getAllSubcategoryIds(category, []),
      ];
      console.log(newSelectedCategories);
      setSelectedCategories(newSelectedCategories);
    } else {
      const allSub = getAllSubcategoryIds(category, []);
      const newSelectedCategories = selectedCategories.filter(
        (id) => !allSub.includes(id)
      );

      setSelectedCategories(newSelectedCategories);
    }
  };
  function getAllSubcategoryIds(category, subcategoryIds = []) {
    subcategoryIds.push(category._id);

    if (category.subcategories.length > 0) {
      for (const subcategory of category.subcategories) {
        getAllSubcategoryIds(subcategory, subcategoryIds);
      }
    }

    return subcategoryIds;
  }

  return (
    <div>
      <h1>Select Categories</h1>
      {categoriesData.map((categoryData) => (
        <CategorySelect
          key={categoryData._id}
          category={categoryData}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />
      ))}
    </div>
  );
}

export default HierarchicalSelect;
