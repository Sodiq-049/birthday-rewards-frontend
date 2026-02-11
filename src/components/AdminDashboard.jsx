import { useEffect, useState } from "react"
import axios from "axios"
import "./AdminDashboard.css" // We'll style it

function AdminDashboard() {
  const [childrenData, setChildrenData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChildren()
  }, [])

    const fetchChildren = async () => {
    try {
        const res = axios.get(`${import.meta.env.VITE_API_URL}/admin/children`)
        console.log("API Response:", res.data) // Debug: check what you actually got

        // Ensure we have an array
        const data = Array.isArray(res.data) ? res.data : res.data?.data || []

        setChildrenData(data)
    } catch (err) {
        console.error("Failed to fetch children:", err)
        setChildrenData([]) // fallback to empty array
    } finally {
        setLoading(false)
    }
    }


  const claimReward = async (parentId, childIndex) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/admin/claim/${parentId}/${childIndex}`)
      // Update local state
      const updated = [...childrenData]
      updated.forEach((parent) => {
        if (parent._id === parentId) {
          parent.children[childIndex].rewardClaimed = true
        }
      })
      setChildrenData(updated)
    } catch (err) {
      console.error("Failed to claim reward:", err)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="admin-dashboard">
      <h2>🎉 Kids Birthday Rewards</h2>
      <table>
        <thead>
          <tr>
            <th>Parent</th>
            <th>Email</th>
            <th>Child</th>
            <th>Birthday</th>
            <th>Reward</th>
          </tr>
        </thead>
        <tbody>
          {childrenData.map((parent) =>
            parent.children.map((child, idx) => (
              <tr
                key={`${parent._id}-${idx}`}
                className={child.rewardClaimed ? "claimed" : ""}
              >
                <td>{parent.fullName}</td>
                <td>{parent.email}</td>
                <td>{child.name}</td>
                <td>{new Date(child.birthday).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => claimReward(parent._id, idx)}
                    disabled={child.rewardClaimed}
                  >
                    {child.rewardClaimed ? "Claimed ✅" : "Claim Reward"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard
