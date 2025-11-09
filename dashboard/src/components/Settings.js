import React, { useEffect, useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Load settings
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('settings') || '{}');
      if (typeof saved.darkMode === 'boolean') setDarkMode(saved.darkMode);
      if (typeof saved.emailNotifications === 'boolean') setEmailNotifications(saved.emailNotifications);
    } catch {}
  }, []);

  // Apply theme and persist on change
  useEffect(() => {
    const settings = { darkMode, emailNotifications };
    localStorage.setItem('settings', JSON.stringify(settings));
    document.body.classList.toggle('theme-dark', darkMode);
  }, [darkMode, emailNotifications]);

  return (
    <div className="panel" style={{ padding: '16px', maxWidth: 720 }}>
      <h2 style={{ marginBottom: '12px' }}>Settings</h2>

      <div style={{ display: 'grid', gap: 16 }}>
        <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: 16 }}>Appearance</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
            Enable dark theme
          </label>
          <p style={{ color: '#6b7280', marginTop: 8, fontSize: 13 }}>Applies a darker palette to the dashboard.</p>
        </section>

        <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: 16 }}>Notifications</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
            Email notifications
          </label>
          <p style={{ color: '#6b7280', marginTop: 8, fontSize: 13 }}>Receive trade confirmations and activity summaries.</p>
        </section>
      </div>
    </div>
  );
};

export default Settings;
