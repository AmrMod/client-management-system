import { useState } from 'react';
import { registerUser } from '../api/userapi';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
          e.preventDefault();
          try {
              const user = await registerUser(name, email, password);
              console.log(user);
          } catch (err) {
              console.log(err);
          }
      };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
