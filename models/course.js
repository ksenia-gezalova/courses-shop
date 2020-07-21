const {Schema, model} = require('mongoose');

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

courseSchema.method('toClient', function () {
  const course = this.Object();

  course.id = course._id;
  delete course._id;

  return course
})

module.exports = model('Course', courseSchema);