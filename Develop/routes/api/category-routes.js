const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // RDT
  try {
    const CategoryData = await Category.findAll();
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // RDT
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product}]
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
  // RDT
  router.post('/', async (req, res) => {
    try {
      const CategoryData = await Category.create(req.body);
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  // update a category by its `id` value
  // RDT
  router.put('/:id', async (req, res) => {
    try {
      const CategoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (!CategoryData[0]) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }

      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  // RDT
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
