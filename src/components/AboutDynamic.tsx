import { useState, useEffect } from 'react';
import './styles/About.css';
import { aboutAPI } from '../services/api';

interface AboutData {
  title: string;
  description: string;
  skills?: string[];
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await aboutAPI.get();
      setAboutData(response.data.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
      // Fallback to default content if API fails
      setAboutData({
        title: 'About Me',
        description: 'Innovative and detail-oriented Shopify Developer, Frontend Developer, and Graphic Designer with hands-on experience in E-commerce operations, TikTok Shop. Skilled in Shopify theme customization and coding, WordPress development, on-page and technical SEO, and data-driven optimization to improve visibility, user experience, and sales performance.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="about-section" id="about">
        <div className="about-me">
          <h3 className="title">Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{aboutData?.title || 'About Me'}</h3>
        <p className="para">
          {aboutData?.description || 'Content coming soon...'}
        </p>
        {aboutData?.skills && aboutData.skills.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {aboutData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  style={{ 
                    background: '#667eea', 
                    color: 'white', 
                    padding: '6px 12px', 
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
