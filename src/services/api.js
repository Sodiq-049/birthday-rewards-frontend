const API_BASE_URL = 'http://localhost:3000'

export async function registerBirthday(data) {
  const response = await fetch(`${API_BASE_URL}/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Something went wrong')
  }

  return response.json()
}

export const getAllChildren = async () => {
  const res = await fetch(`${API_BASE}/admin/children`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export const claimReward = async (parentId, childIndex) => {
  const res = await fetch(
    `${API_BASE}/admin/claim/${parentId}/${childIndex}`,
    {
      method: 'PATCH',
    },
  )

  if (!res.ok) throw new Error('Failed to claim reward')
  return res.json()
}