'use client'
 
import { useState } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Login() {
  const router = useRouter()
 
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
 
  const handleLogin = () => {
    const storedUser = localStorage.getItem('user')
 
    if (!storedUser) {
      alert('No user found. Please signup first.')
      return
    }
 
    const user = JSON.parse(storedUser)
 
    if (user.email === email && user.password === password) {
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/')
    } else {
      alert('Invalid credentials')
    }
  }
 
  return (
    <div>
      <h2>Login Page</h2>
 
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
 
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}