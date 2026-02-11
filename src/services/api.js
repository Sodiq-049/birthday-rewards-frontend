

// Automatically choose backend URL based on environment
export const API_BASE_URL =
  import.meta.env.VITE_API_URL;

/**
 * Register a new child/parent birthday
 * @param {Object} data - Registration data
 */
export async function registerBirthday(data) {
  const response = await fetch(`${API_BASE_URL}/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

/**
 * Get all children for admin dashboard
 */
export const getAllChildren = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/children`);

  if (!res.ok) {
    throw new Error("Failed to fetch children");
  }

  return res.json();
};

/**
 * Claim a reward for a child
 * @param {string} parentId - Parent's ID
 * @param {number} childIndex - Index of the child in the parent's children array
 */
export const claimReward = async (parentId, childIndex) => {
  const res = await fetch(
    `${API_BASE_URL}/admin/claim/${parentId}/${childIndex}`,
    {
      method: "PATCH",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to claim reward");
  }

  return res.json();
};
