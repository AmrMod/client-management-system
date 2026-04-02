import { useState } from 'react';
import { registerUser } from '../api/userapi';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            if (!name || !email || !password) {
              alert("Please fill in all the fields");
              return;
            }
            if (password.length < 6) {
              alert("Password must be at least 6 characters long");
              return;
            }
            if (!email.includes('@')) {
              alert("Please enter a valid email");
              return;
            }
            if (!name.includes(' ')) {
              alert("Please enter a valid name");
              return;
            }
              const user = await registerUser(name, email, password);
              alert("User registered successfully");
              console.log(user);
          } catch (err) {
              alert(err.message);
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
