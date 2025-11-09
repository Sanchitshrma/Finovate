import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  });
  const [displayName, setDisplayName] = useState(() => user?.displayName || user?.email?.split('@')[0] || '');
  const [saved, setSaved] = useState(false);

  const email = user?.email || 'User';

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...user, displayName };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    // Notify other components (e.g., UserMenu) and show feedback
    window.dispatchEvent(new Event('user-updated'));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="panel" style={{ padding: '16px', maxWidth: 720 }}>
      <h2 style={{ marginBottom: '12px' }}>Profile</h2>
      <form onSubmit={handleSave} style={{ display: 'grid', gap: 16 }}>
        <div style={{ lineHeight: 1.8 }}>
          <div><strong>Email:</strong> {email}</div>
          <div><strong>User ID:</strong> {user?.id || 'N/A'}</div>
        </div>

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Display name</span>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6 }}
          />
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="submit" style={{
            padding: '10px 14px', borderRadius: 8, border: 'none', background: '#667eea', color: '#fff', cursor: 'pointer'
          }}>Save changes</button>
          {saved && <span style={{ color: '#16a34a', fontSize: 13 }}>Saved</span>}
        </div>
      </form>
    </div>
  );
};

export default Profile;
