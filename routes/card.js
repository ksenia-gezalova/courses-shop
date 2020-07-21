const { Router } = require('express');
const Course = require('../models/course');
const auth = require("../middleware/auth");

const router = Router();

function mapCartItems(cart) {
  return cart.items.map(c => ({
    ...c.courseId._doc,
    count: c.count,
    id: c.courseId._id
  }))
}

function getTotalPrice(courses) {
  return courses.reduce((total, course) => {
    return total += course.price * course.count
  }, 0)
}

router.post('/add', auth, async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect('/card');
})

router.delete('/remove/:id', auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id);

  const user = await req.user.populate('cart.items.courseId').execPopulate();

  const courses = mapCartItems(user.cart);

  const cart = {
    courses, price: getTotalPrice(courses)
  }

  res.status(200).json(cart);
})

router.get('/', auth, async (req, res) => {
  const user = await req.user
    .populate('cart.items.courseId')
    .execPopulate()
  
  const courses = mapCartItems(user.cart)

  res.render('card', {
    title: 'Basket',
    isBasket: true,
    courses: courses,
    price: getTotalPrice(courses)
  })
})

module.exports = router;