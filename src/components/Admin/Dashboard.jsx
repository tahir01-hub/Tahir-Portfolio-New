import { useState, useEffect } from 'react';
import { projectAPI, careerAPI, contactAPI, skillAPI } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    careers: 0,
    messages: 0,
    skills: 0,
    newMessages: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projects, careers, contacts, skills] = await Promise.all([
        projectAPI.getAll(),
        careerAPI.getAll(),
        contactAPI.getAll(),
        skillAPI.getAll()
      ]);

      const newMessages = contacts.data.data.filter(m => m.status === 'new').length;

      setStats({
        projects: projects.data.count,
        careers: careers.data.count,
        messages: contacts.data.count,
        skills: skills.data.count,
        newMessages
      });

      setRecentMessages(contacts.data.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-info">
            <h3>Projects</h3>
            <p className="stat-number">{stats.projects}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>Career Entries</h3>
            <p className="stat-number">{stats.careers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <h3>Skills</h3>
            <p className="stat-number">{stats.skills}</p>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <h3>Messages</h3>
            <p className="stat-number">
              {stats.messages} 
              {stats.newMessages > 0 && (
                <span className="badge">{stats.newMessages} new</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h3>Recent Messages</h3>
        <div className="messages-list">
          {recentMessages.length === 0 ? (
            <p className="no-data">No messages yet</p>
          ) : (
            recentMessages.map((message) => (
              <div key={message._id} className="message-item">
                <div className="message-header">
                  <strong>{message.name}</strong>
                  <span className={`status-badge ${message.status}`}>
                    {message.status}
                  </span>
                </div>
                <p className="message-subject">{message.subject}</p>
                <p className="message-date">
                  {new Date(message.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
