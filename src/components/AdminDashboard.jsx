import { useEffect, useState } from "react"
import axios from "axios"
import "./AdminDashboard.css"
import { API_BASE_URL } from "../services/api";

function AdminDashboard() {
  const [childrenData, setChildrenData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChildren()
  }, [])

    const fetchChildren = async () => {
    try {
         const res = await axios.get(`${API_BASE_URL}/admin/children`);
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
        // Use centralized API base URL
        const res = await axios.patch(`${API_BASE_URL}/admin/claim/${parentId}/${childIndex}`);

        // Update local state safely
        setChildrenData((prevData) =>
        prevData.map((parent) => {
            if (parent._id === parentId) {
            const updatedChildren = parent.children.map((child, idx) => {
                if (idx === childIndex) {
                return { ...child, rewardClaimed: true };
                }
                return child;
            });
            return { ...parent, children: updatedChildren };
            }
            return parent;
        })
        );

        console.log("Reward claimed:", res.data);
    } catch (err) {
        console.error("Failed to claim reward:", err.response?.data || err.message);
    }
    };

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
                    type="button"
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
