import { useState } from 'react'
import ParentForm from '../components/ParentForm'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'

function Register() {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="container">
      {/* Top bar with Admin button */}
      <div className="top-bar">
        {!isAdmin && (
          <button className="admin-btn" onClick={() => setShowAdminLogin(true)}>
            Admin
          </button>
        )}
      </div>

      <img
        src="/download.png"
        alt="The Little Big Kid Company Logo"
      />

      <h2>Welcome to The Little Big Kid Company</h2>
      <h2>Kids Birthday Reward Registration</h2>

      {/* Parent form shows only if not logged in as admin */}
      {!isAdmin && <ParentForm />}

      {/* Admin Modal */}
      {showAdminLogin && (
        <AdminLogin
          onSuccess={() => {
            setIsAdmin(true)
            setShowAdminLogin(false)
          }}
          onCancel={() => setShowAdminLogin(false)}
        />
      )}

      {/* Admin Dashboard shows after login */}
      {isAdmin && (
        <div>
          <button className="back-btn" onClick={() => setIsAdmin(false)}>
            ← Back to Registration
          </button>

          <AdminDashboard />
        </div>
      )}
    </div>
  )
}

export default Register
