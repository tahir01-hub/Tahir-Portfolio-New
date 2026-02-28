import { useState, useEffect } from 'react';
import { aboutAPI } from '../../services/api';
import '../Admin/ProjectsManager.css';

const AboutManager = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: 'About Me',
    description: '',
    skills: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await aboutAPI.get();
      if (response.data.data) {
        const data = response.data.data;
        setAbout(data);
        setFormData({
          title: data.title,
          description: data.description,
          skills: data.skills?.join(', ') || '',
          imageUrl: data.imageUrl || ''
        });
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      title: formData.title,
      description: formData.description,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      imageUrl: formData.imageUrl
    };

    try {
      if (about) {
        await aboutAPI.update(about._id, data);
        alert('About section updated successfully!');
      } else {
        await aboutAPI.create(data);
        alert('About section created successfully!');
      }
      
      fetchAbout();
    } catch (error) {
      console.error('Error saving about:', error);
      alert('Failed to save about section: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>About Section Management</h2>
      </div>

      <div className="form-container">
        <h3>{about ? 'Edit About Section' : 'Create About Section'}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="8"
              required
            />
          </div>

          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="JavaScript, React, Node.js"
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {about ? 'Update' : 'Create'} About Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutManager;
