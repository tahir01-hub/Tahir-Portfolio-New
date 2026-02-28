import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'About Me'
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  skills: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const About = mongoose.model('About', aboutSchema);

export default About;
