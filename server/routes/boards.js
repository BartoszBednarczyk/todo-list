const express = require('express')
const router = express.Router()
const Board = require('../models/board')
const cors = require('cors')

// Getting all
router.get('/', cors(), async (req, res) => {
  try {
    const boards = await Board.find()
    res.json(boards)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', cors(), getBoard, (req, res) => {
  res.json(res.board)
})

// Creating one
router.post('/', cors(), async (req, res) => {
  const board = new Board({
    boardName: req.body.boardName,
    boardContent: req.body.boardContent,
    id: req.body.id
  })
  try {
    const newBoard = await board.save()
    res.status(201).json(newBoard)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', cors(), getBoard, async (req, res) => {
  if (req.body.boardName != null) {
    res.board.boardName = req.body.boardName
  }
  if (req.body.boardContent != null) {
    res.board.boardContent = req.body.boardContent
  }
  try {
    const updatedBoard = await res.board.save()
    res.json(updatedBoard)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//Deleting One
router.delete('/:id', cors(), getBoard, async (req, res) => {
  try {
    await res.board.remove()
    res.json({ message: 'Deleted Board' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// router.delete('/:id', async (req, res) => {
//   try {
//     console.log(req.params)
//     await Board.deleteOne({id: req.params.id})
//     res.json({ message: 'Deleted Board' })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

async function getBoard(req, res, next) {
  let board
  try {
    board = await Board.findById(req.params.id)
    if (board == null) {
      return res.status(404).json({ message: 'Cannot find board' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.board = board
  next()
}

module.exports = router