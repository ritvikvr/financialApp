const express = require('express');
const { readData, writeData, generateId } = require('../data');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /transactions
// @desc    Get all transactions for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const data = readData();
    const transactions = data.transactions
      .filter(t => t.userId === req.user.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /transactions/add
// @desc    Add new transaction
// @access  Private
router.post('/add', auth, async (req, res) => {
  const { description, amount, type, date } = req.body;

  try {
    const data = readData();
    const newTransaction = {
      _id: generateId(),
      userId: req.user.id,
      description,
      amount: parseFloat(amount),
      type,
      date,
    };

    data.transactions.push(newTransaction);
    writeData(data);
    res.json(newTransaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const data = readData();
    const transactionIndex = data.transactions.findIndex(t => t._id === req.params.id);

    if (transactionIndex === -1) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    const transaction = data.transactions[transactionIndex];

    // Check user
    if (transaction.userId !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    data.transactions.splice(transactionIndex, 1);
    writeData(data);
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;