const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/allattributes/:id", async (req, res) => {
  const { id: categoryId } = req.params;
  try {
    const attributes = await getAllAttributesRecursively(categoryId);
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
    } else res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getAllAttributesRecursively = async (categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return [];
    }

    const currentAttributes = category.attributes;

    if (category.parent) {
      const ancestorAttributes = await getAllAttributesRecursively(
        category.parent
      );
      return [...ancestorAttributes, ...currentAttributes];
    } else {
      return currentAttributes;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = router;
