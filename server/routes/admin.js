const router = require("express").Router();
const Seller = require("../models/Seller");
const Category = require("../models/Category");
const { Product } = require("../models/Product");
// Create a new category
router.post("/category/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    console.log(category);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add Attribute
router.post("/attribute/:id", async (req, res) => {
  console.log("toggle");
  const { id } = req.params;
  const newAttribute = req.body;
  console.log(newAttribute);
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    category.attributes.push(newAttribute);

    // Save the updated category with the new attribute
    const updatedCategory = await category.save();

    return res.json({
      success: true,
      message: "Attribute added successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error("Error updating new attribute:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating new attribute" });
  }
});

const hasAssociatedProducts = async (
  categoryId,
  checkedCategories = new Set()
) => {
  console.log(categoryId);
  if (checkedCategories.has(categoryId)) {
    return false; // Prevent infinite loops in circular references
  }

  checkedCategories.add(categoryId);

  let category = await Category.findById(categoryId);
  if (!category) {
    return false; // Category not found
  }

  let associatedProducts = await Product.find({ category: category._id });
  if (associatedProducts.length > 0) {
    return true;
  }

  // Recursively check subcategories
  let subcategories = await Category.find({ parent: category._id });
  for (let subcategory of subcategories) {
    if (await hasAssociatedProducts(subcategory._id, checkedCategories)) {
      return true;
    }
  }

  return false; // No associated products found
};

const deleteCategoryAndChildren = async (
  categoryId,
  checkedCategories = new Set()
) => {
  try {
    if (checkedCategories.has(categoryId)) {
      return false; // Prevent infinite loops in circular references
    }
    console.log(categoryId);

    checkedCategories.add(categoryId);
    const category = await Category.findById(categoryId);

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    const children = await Category.find({ parent: category._id });

    for (const child of children) {
      await deleteCategoryAndChildren(child._id, checkedCategories);
    }

    await category.remove();
    return {
      success: true,
      message: "Category and its children deleted successfully",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
router.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (await hasAssociatedProducts(id)) {
      return res
        .status(400)
        .json({ error: "Category has associated products, cannot delete" });
    }

    const deletionResult = await deleteCategoryAndChildren(id);

    if (!deletionResult.success) {
      return res.status(404).json({ error: deletionResult.message });
    }

    res.json({ message: "Category and its children deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /category/:id:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/sellers", async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/changestatus/:id", async (req, res) => {
  const { id } = req.params;
  // const  product = req.body;
  const { newStatus } = req.body;
  console.log(newStatus)

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { $set: { sellerStatus: newStatus } },
      { new: true }
    );
    if (!updatedSeller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found" });
    }

    return res.json({
      success: true,
      message: `Seller with ID ${id} status updated to ${newStatus}`,
    });
  } catch (error) {
    console.error("Error updating seller status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating seller status" });
  }
});

module.exports = router;
