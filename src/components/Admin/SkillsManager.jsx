import { useState, useEffect } from 'react';
import { skillAPI } from '../../services/api';
import '../Admin/ProjectsManager.css';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'other',
    proficiency: 50,
    order: 0,
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillAPI.getAll();
      setSkills(response.data.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      alert('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingSkill) {
        await skillAPI.update(editingSkill._id, data);
        alert('Skill updated successfully!');
      } else {
        await skillAPI.create(data);
        alert('Skill created successfully!');
      }
      
      resetForm();
      fetchSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Failed to save skill: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      order: skill.order,
      imageUrl: skill.imageUrl
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      await skillAPI.delete(id);
      alert('Skill deleted successfully!');
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Failed to delete skill');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'other',
      proficiency: 50,
      order: 0,
      imageUrl: ''
    });
    setImageFile(null);
    setEditingSkill(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Skills Management</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ Add Skill'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                  <option value="tools">Tools</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Proficiency (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              {formData.imageUrl && <small>Current: {formData.imageUrl}</small>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingSkill ? 'Update' : 'Create'} Skill
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Proficiency</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No skills yet</td>
              </tr>
            ) : (
              skills.map((skill) => (
                <tr key={skill._id}>
                  <td>{skill.name}</td>
                  <td>{skill.category}</td>
                  <td>{skill.proficiency}%</td>
                  <td>
                    {skill.imageUrl && (
                      <img 
                        src={`http://localhost:5000${skill.imageUrl}`} 
                        alt={skill.name}
                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(skill)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(skill._id)} className="btn-delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillsManager;
