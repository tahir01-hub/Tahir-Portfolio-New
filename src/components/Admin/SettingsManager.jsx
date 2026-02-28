import { useState, useEffect } from 'react';
import { settingsAPI } from '../../services/api';
import '../Admin/ProjectsManager.css';

const SettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    siteName: '',
    siteTitle: '',
    siteDescription: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: '',
      behance: '',
      dribbble: ''
    },
    seo: {
      metaKeywords: '',
      metaDescription: '',
      ogImage: ''
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.data) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await settingsAPI.update(formData);
      alert('Settings updated successfully!');
      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Settings Management</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="admin-form">
          <h3>General Settings</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Site Name</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Site Title</label>
              <input
                type="text"
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Site Description</label>
            <textarea
              value={formData.siteDescription}
              onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
              rows="3"
            />
          </div>

          <h3>Contact Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <h3>Social Links</h3>
          <div className="form-row">
            <div className="form-group">
              <label>GitHub</label>
              <input
                type="url"
                value={formData.socialLinks.github}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, github: e.target.value }
                })}
              />
            </div>

            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Twitter</label>
              <input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                })}
              />
            </div>

            <div className="form-group">
              <label>Instagram</label>
              <input
                type="url"
                value={formData.socialLinks.instagram}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                })}
              />
            </div>
          </div>

          <h3>SEO Settings</h3>
          <div className="form-group">
            <label>Meta Keywords</label>
            <input
              type="text"
              value={formData.seo.metaKeywords}
              onChange={(e) => setFormData({ 
                ...formData, 
                seo: { ...formData.seo, metaKeywords: e.target.value }
              })}
              placeholder="portfolio, web developer, designer"
            />
          </div>

          <div className="form-group">
            <label>Meta Description</label>
            <textarea
              value={formData.seo.metaDescription}
              onChange={(e) => setFormData({ 
                ...formData, 
                seo: { ...formData.seo, metaDescription: e.target.value }
              })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>OG Image URL</label>
            <input
              type="url"
              value={formData.seo.ogImage}
              onChange={(e) => setFormData({ 
                ...formData, 
                seo: { ...formData.seo, ogImage: e.target.value }
              })}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsManager;
