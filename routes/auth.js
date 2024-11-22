const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Query = require('../models/Query');

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let user = await Student.findOne({ studentEmail: email, studentPassword: password });
  if (user) {
    return res.json({ role: 'student', userId: user._id });
  }

  user = await Teacher.findOne({ teacherEmail: email, teacherPassword: password });
  if (user) {
    return res.json({ role: 'teacher', userId: user._id });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Add a new query
router.post('/addQuery', async (req, res) => {
  const { studentIdInQuery, courseInQuery, courseCodeInQuery, slotInQuery, topicInQuery, doubtInQuery } = req.body;
  
  // Check if required fields are present
  if (!studentIdInQuery || !courseInQuery || !doubtInQuery) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newQuery = new Query({
      studentIdInQuery,
      courseInQuery,
      courseCodeInQuery,
      slotInQuery,
      topicInQuery,
      doubtInQuery
    });
    await newQuery.save();
    res.status(201).json({ message: 'Query created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating query' });
  }
});

//  student detail
router.get('/student/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student details' });
  }
});


// Get queries based on role
router.get('/allQueries', async (req, res) => {
  const { userId, role } = req.query; // Get userId and role from query parameters

  try {
    let queries;
    if (role === 'student') {
      // Fetch only the queries created by this student
      queries = await Query.find({ studentIdInQuery: userId });
    } else if (role === 'teacher') {
      // Fetch all queries for teachers and populate student details
      queries = await Query.find().populate('studentIdInQuery', 'studentRegNo');
    } else {
      return res.status(400).json({ error: 'Invalid role specified' });
    }
    res.json(queries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching queries' });
  }
});



// Delete a query by ID
router.delete('/deleteQuery/:id', async (req, res) => {
  const queryId = req.params.id;
  try {
    const deletedQuery = await Query.findByIdAndDelete(queryId);
    if (!deletedQuery) {
      return res.status(404).json({ error: 'Query not found' });
    }
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting query' });
  }
});

// Update a query by ID
router.put('/updateQuery/:id', async (req, res) => {
  const queryId = req.params.id;
  const { courseInQuery, courseCodeInQuery, slotInQuery, topicInQuery, doubtInQuery, feedbackInQuery, feedbackStatus } = req.body;

  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      queryId,
      { courseInQuery, courseCodeInQuery, slotInQuery, topicInQuery, doubtInQuery, feedbackInQuery, feedbackStatus },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ error: 'Query not found' });
    }

    res.json({ message: 'Query updated successfully', updatedQuery });
  } catch (error) {
    res.status(500).json({ error: 'Error updating query' });
  }
});

// logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});


module.exports = router;
