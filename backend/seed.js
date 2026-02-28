import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import About from './models/About.js';
import Project from './models/Project.js';
import Career from './models/Career.js';
import Skill from './models/Skill.js';
import Settings from './models/Settings.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      About.deleteMany({}),
      Project.deleteMany({}),
      Career.deleteMany({}),
      Skill.deleteMany({}),
      Settings.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed About
    const about = new About({
      title: 'About Me',
      description: 'Innovative and detail-oriented Shopify Developer, Frontend Developer, and Graphic Designer with hands-on experience in E-commerce operations, TikTok Shop. Skilled in Shopify theme customization and coding, WordPress development, on-page and technical SEO, and data-driven optimization to improve visibility, user experience, and sales performance. Experienced in creating high-impact visual content, managing online store operations. Currently pursuing a BS in Software Engineering, with a strong passion for building engaging digital experiences that drive measurable business growth.',
      skills: ['Shopify', 'WordPress', 'Frontend Development', 'SEO', 'Graphic Design'],
      isActive: true
    });
    await about.save();
    console.log('✅ About section seeded');

    // Seed Projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        category: 'Web Development',
        description: 'A full-featured e-commerce platform with cart, checkout, and payment integration.',
        tools: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        imageUrl: '/images/placeholder.webp',
        projectUrl: 'https://example.com',
        order: 1,
        featured: true,
        isActive: true
      },
      {
        title: 'Portfolio Website',
        category: 'Web Design',
        description: 'Modern portfolio website with 3D animations and smooth scrolling.',
        tools: ['React', 'Three.js', 'GSAP'],
        imageUrl: '/images/placeholder.webp',
        order: 2,
        isActive: true
      },
      {
        title: 'Mobile App',
        category: 'Mobile Development',
        description: 'Cross-platform mobile application for task management.',
        tools: ['React Native', 'Firebase', 'Redux'],
        imageUrl: '/images/placeholder.webp',
        order: 3,
        isActive: true
      }
    ];
    await Project.insertMany(projects);
    console.log('✅ Projects seeded');

    // Seed Career
    const careers = [
      {
        position: 'Senior Frontend Developer',
        company: 'Tech Company Inc',
        description: 'Leading frontend development team, implementing modern React architectures and improving user experience.',
        year: 'NOW',
        startDate: 'Jan 2023',
        isCurrent: true,
        order: 1,
        isActive: true
      },
      {
        position: 'Shopify Developer',
        company: 'E-Commerce Solutions',
        description: 'Developed custom Shopify themes and apps, optimized store performance and implemented SEO best practices.',
        year: '2022',
        startDate: 'Mar 2021',
        endDate: 'Dec 2022',
        isCurrent: false,
        order: 2,
        isActive: true
      },
      {
        position: 'Junior Web Developer',
        company: 'Digital Agency',
        description: 'Built responsive websites, collaborated with design team, and maintained client projects.',
        year: '2020',
        startDate: 'Jun 2019',
        endDate: 'Feb 2021',
        isCurrent: false,
        order: 3,
        isActive: true
      }
    ];
    await Career.insertMany(careers);
    console.log('✅ Career entries seeded');

    // Seed Skills
    const skills = [
      { name: 'React', imageUrl: '/images/react2.webp', category: 'frontend', proficiency: 90, order: 1 },
      { name: 'Next.js', imageUrl: '/images/next2.webp', category: 'frontend', proficiency: 85, order: 2 },
      { name: 'Node.js', imageUrl: '/images/node2.webp', category: 'backend', proficiency: 80, order: 3 },
      { name: 'Express', imageUrl: '/images/express.webp', category: 'backend', proficiency: 85, order: 4 },
      { name: 'MongoDB', imageUrl: '/images/mongo.webp', category: 'database', proficiency: 75, order: 5 },
      { name: 'MySQL', imageUrl: '/images/mysql.webp', category: 'database', proficiency: 70, order: 6 },
      { name: 'TypeScript', imageUrl: '/images/typescript.webp', category: 'frontend', proficiency: 85, order: 7 },
      { name: 'JavaScript', imageUrl: '/images/javascript.webp', category: 'frontend', proficiency: 95, order: 8 },
    ];
    await Skill.insertMany(skills);
    console.log('✅ Skills seeded');

    // Seed Settings
    const settings = new Settings({
      siteName: 'Portfolio',
      siteTitle: 'Professional Portfolio Website',
      siteDescription: 'Showcasing my work and experience in web development',
      email: 'contact@example.com',
      socialLinks: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername'
      }
    });
    await settings.save();
    console.log('✅ Settings seeded');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
