import { useState } from "react"
import AdminLogin from "../components/AdminLogin"
import AdminDashboard from "../components/AdminDashboard"

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div>
      {!isAdmin ? (
        <AdminLogin onSuccess={() => setIsAdmin(true)} />
      ) : (
        <AdminDashboard />
      )}
    </div>
  )

}

export default Admin
