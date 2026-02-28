import { useState, useEffect } from 'react';
import './styles/Career.css';
import { careerAPI } from '../services/api';

interface CareerEntry {
  _id: string;
  position: string;
  company: string;
  description: string;
  year: string;
  isCurrent?: boolean;
}

const Career = () => {
  const [careers, setCareers] = useState<CareerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await careerAPI.getAll();
      setCareers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching careers:', error);
      // Fallback to default content if API fails
      setCareers([
        {
          _id: '1',
          position: 'Position In Company',
          company: 'Company Name',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim labore sit non ipsum temporibus quidem, deserunt eaque officiis mollitia ratione suscipit repellat.',
          year: '20XX'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="career-section section-container">
        <div className="career-container">
          <h2>
            My career <span>&</span>
            <br /> experience
          </h2>
          <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careers.length === 0 ? (
            <div style={{ padding: '20px', color: '#999', textAlign: 'center' }}>
              No career entries available yet.
            </div>
          ) : (
            careers.map((career) => (
              <div className="career-info-box" key={career._id}>
                <div className="career-info-in">
                  <div className="career-role">
                    <h4>{career.position}</h4>
                    <h5>{career.company}</h5>
                  </div>
                  <h3>{career.year}</h3>
                </div>
                <p>{career.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;
