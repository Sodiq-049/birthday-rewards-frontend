function ChildForm({ child, index, updateChild }) {
  const handleChange = (e) => {
    updateChild(index, { ...child, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ marginBottom: '15px' }}>
      <input
        name="name"
        placeholder={`Child ${index + 1} Name`}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="birthday"
        onChange={handleChange}
        required
      />

      <select name="gender" onChange={handleChange} required>
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  )
}

export default ChildForm
