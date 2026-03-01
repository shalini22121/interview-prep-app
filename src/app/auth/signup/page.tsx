'use client'
 
import { useState } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Signup() {
  const router = useRouter()
 
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
 
  const handleSignup = () => {
    if (!email || !password) {
      alert('Please fill all fields')
      return
    }
 
    const user = { email, password }
    localStorage.setItem('user', JSON.stringify(user))
 
    alert('Signup successful')
    router.push('/login')
  }
 
  return (
    <div>
      <h2>Signup Page</h2>
 
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
 
      <br /><br />
 
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
 
      <br /><br />
 
      <button onClick={handleSignup}>Signup</button>
    </div>
  )
}