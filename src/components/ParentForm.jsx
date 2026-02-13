import { useState } from 'react'
import ChildForm from './ChildForm'
import { registerBirthday } from '../services/api'

function ParentForm() {
  const [parent, setParent] = useState({
    title: '',
    fullName: '',
    email: ''
  })

  const [children, setChildren] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleParentChange = (e) => {
    setParent({ ...parent, [e.target.name]: e.target.value })
  }

  const addChild = () => {
    if (children.length >= 4) {
      setError('You can only add up to 4 children.')
      return
    }
    setError('')
    setChildren([...children, { name: '', birthday: '', gender: '' }])
  }

  const updateChild = (index, updatedChild) => {
    const newChildren = [...children]
    newChildren[index] = updatedChild
    setChildren(newChildren)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (children.length === 0) {
      setError('Please add at least one child.')
      return
    }

    const payload = {
      parent,
      children
    }

    try {
      setLoading(true)
      await registerBirthday(payload)

      // ✅ SUCCESS: reset form
      setParent({ title: '', fullName: '', email: '' })
      setChildren([])

      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registration successful!</p>}

      <select name="title" value={parent.title} onChange={handleParentChange} required>
        <option value="">Select Title</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Mrs">Miss</option>
      </select>

      <input
        name="fullName"
        placeholder="Parent Full Name"
        value={parent.fullName}
        onChange={handleParentChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Parent Email"
        value={parent.email}
        onChange={handleParentChange}
        required
      />

      <h3>Children Details</h3>

      {children.map((child, index) => (
        <ChildForm
          key={index}
          index={index}
          child={child}
          updateChild={updateChild}
        />
      ))}

      {children.length < 4 && (
        <button type="button" onClick={addChild}>
          + Add Child
        </button>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default ParentForm
