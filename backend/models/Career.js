import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Career = mongoose.model('Career', careerSchema);

export default Career;
