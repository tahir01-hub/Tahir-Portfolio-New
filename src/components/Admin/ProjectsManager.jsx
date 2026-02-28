import { useState, useEffect } from 'react';
import { projectAPI } from '../../services/api';
import './ProjectsManager.css';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tools: '',
    projectUrl: '',
    githubUrl: '',
    imageUrl: '',
    order: 0,
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to fetch projects');
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
      if (editingProject) {
        await projectAPI.update(editingProject._id, data);
        alert('Project updated successfully!');
      } else {
        await projectAPI.create(data);
        alert('Project created successfully!');
      }
      
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      tools: project.tools.join(', '),
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || '',
      imageUrl: project.imageUrl || '',
      order: project.order,
      featured: project.featured
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await projectAPI.delete(id);
      alert('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      tools: '',
      projectUrl: '',
      githubUrl: '',
      imageUrl: '',
      order: 0,
      featured: false
    });
    setImageFile(null);
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Projects Management</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
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
                <label>Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Tools (comma separated) *</label>
              <input
                type="text"
                value={formData.tools}
                onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                placeholder="React, Node.js, MongoDB"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Project URL</label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                {formData.imageUrl && <small>Current: {formData.imageUrl}</small>}
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
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                Featured Project
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingProject ? 'Update' : 'Create'} Project
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
              <th>Title</th>
              <th>Category</th>
              <th>Tools</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No projects yet</td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>{project.category}</td>
                  <td>{project.tools.join(', ')}</td>
                  <td>{project.featured ? '⭐' : '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(project)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="btn-delete">
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

export default ProjectsManager;
