import { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import '../Admin/ProjectsManager.css';
import './ContactsManager.css';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAll();
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status);
      fetchContacts();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleToggleStar = async (id) => {
    try {
      await contactAPI.toggleStar(id);
      fetchContacts();
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await contactAPI.delete(id);
      alert('Message deleted successfully!');
      setSelectedContact(null);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const handleViewMessage = async (contact) => {
    setSelectedContact(contact);
    if (contact.status === 'new') {
      handleStatusChange(contact._id, 'read');
    }
  };

  const filteredContacts = filterStatus === 'all' 
    ? contacts 
    : contacts.filter(c => c.status === filterStatus);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Messages Management</h2>
        <div className="filter-buttons">
          <button 
            className={filterStatus === 'all' ? 'active' : ''}
            onClick={() => setFilterStatus('all')}
          >
            All ({contacts.length})
          </button>
          <button 
            className={filterStatus === 'new' ? 'active' : ''}
            onClick={() => setFilterStatus('new')}
          >
            New ({contacts.filter(c => c.status === 'new').length})
          </button>
          <button 
            className={filterStatus === 'read' ? 'active' : ''}
            onClick={() => setFilterStatus('read')}
          >
            Read
          </button>
          <button 
            className={filterStatus === 'replied' ? 'active' : ''}
            onClick={() => setFilterStatus('replied')}
          >
            Replied
          </button>
        </div>
      </div>

      <div className="contacts-layout">
        <div className="contacts-list">
          {filteredContacts.length === 0 ? (
            <div className="no-messages">No messages</div>
          ) : (
            filteredContacts.map((contact) => (
              <div 
                key={contact._id} 
                className={`contact-item ${selectedContact?._id === contact._id ? 'selected' : ''} ${contact.status === 'new' ? 'unread' : ''}`}
                onClick={() => handleViewMessage(contact)}
              >
                <div className="contact-item-header">
                  <strong>{contact.name}</strong>
                  <span className="contact-date">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="contact-subject">{contact.subject}</div>
                <div className="contact-meta">
                  <span className={`status-badge ${contact.status}`}>
                    {contact.status}
                  </span>
                  {contact.isStarred && <span className="star">⭐</span>}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedContact && (
          <div className="contact-detail">
            <div className="detail-header">
              <div>
                <h3>{selectedContact.subject}</h3>
                <p className="sender-info">
                  From: <strong>{selectedContact.name}</strong> ({selectedContact.email})
                </p>
                <p className="date-info">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
              <button onClick={() => setSelectedContact(null)} className="close-btn">
                ✕
              </button>
            </div>

            <div className="detail-content">
              <p>{selectedContact.message}</p>
            </div>

            <div className="detail-actions">
              <select 
                value={selectedContact.status}
                onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                className="status-select"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>

              <button 
                onClick={() => handleToggleStar(selectedContact._id)}
                className={`btn-star ${selectedContact.isStarred ? 'starred' : ''}`}
              >
                {selectedContact.isStarred ? '⭐ Starred' : '☆ Star'}
              </button>

              <button 
                onClick={() => handleDelete(selectedContact._id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsManager;
