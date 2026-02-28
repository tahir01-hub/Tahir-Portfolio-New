import { useState, useEffect } from 'react';
import { careerAPI } from '../../services/api';
import '../Admin/ProjectsManager.css';

const CareerManager = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    description: '',
    year: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    order: 0
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await careerAPI.getAll();
      setCareers(response.data.data);
    } catch (error) {
      console.error('Error fetching careers:', error);
      alert('Failed to fetch career entries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCareer) {
        await careerAPI.update(editingCareer._id, formData);
        alert('Career entry updated successfully!');
      } else {
        await careerAPI.create(formData);
        alert('Career entry created successfully!');
      }
      
      resetForm();
      fetchCareers();
    } catch (error) {
      console.error('Error saving career:', error);
      alert('Failed to save career entry: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (career) => {
    setEditingCareer(career);
    setFormData({
      position: career.position,
      company: career.company,
      description: career.description,
      year: career.year,
      startDate: career.startDate || '',
      endDate: career.endDate || '',
      isCurrent: career.isCurrent,
      order: career.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this career entry?')) return;
    
    try {
      await careerAPI.delete(id);
      alert('Career entry deleted successfully!');
      fetchCareers();
    } catch (error) {
      console.error('Error deleting career:', error);
      alert('Failed to delete career entry');
    }
  };

  const resetForm = () => {
    setFormData({
      position: '',
      company: '',
      description: '',
      year: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      order: 0
    });
    setEditingCareer(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Career Management</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ Add Career Entry'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingCareer ? 'Edit Career Entry' : 'Add New Career Entry'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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

            <div className="form-row">
              <div className="form-group">
                <label>Year/Display *</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2023 or NOW"
                  required
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

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="Jan 2023"
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="text"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="Dec 2023 or Present"
                  disabled={formData.isCurrent}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                />
                Currently working here
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingCareer ? 'Update' : 'Create'} Career Entry
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
              <th>Position</th>
              <th>Company</th>
              <th>Year</th>
              <th>Current</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No career entries yet</td>
              </tr>
            ) : (
              careers.map((career) => (
                <tr key={career._id}>
                  <td>{career.position}</td>
                  <td>{career.company}</td>
                  <td>{career.year}</td>
                  <td>{career.isCurrent ? '✓' : '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(career)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(career._id)} className="btn-delete">
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

export default CareerManager;
