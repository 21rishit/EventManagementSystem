import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useContext(UserContext); // Context to store user info globally

  //! Retrieve saved email & password if "Remember Me" was checked previously
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPass = localStorage.getItem('rememberedpass');

    if (storedEmail) {
      setEmail(storedEmail);
      setPassword(storedPass);
      setRememberMe(true); // Keep "Remember Me" checked
    }
  }, []);

  //! Function to handle user login
  async function loginUser(ev) {
    ev.preventDefault();

    try {
      const { data } = await axios.post(
        'auth/login', // Ensure correct backend API
        { email, password },
        { withCredentials: true } // Enables cookie-based authentication if needed
      );

      setUser(data); // Store user info globally in context
      alert('Login successful!');

      // If "Remember Me" is checked, save email and password
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedpass', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedpass');
      }

      setRedirect(true); // Redirect to home page
    } catch {
      alert('Login failed. Please check your credentials.');
    }
  }

  //! Redirect to homepage after successful login
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="flex w-full h-full lg:ml-24 px-10 py-10 justify-between place-items-center mt-20">
      <div className="bg-white w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-7 rounded-xl justify-center align-middle">
        <form className="flex flex-col w-auto items-center" onSubmit={loginUser}>
          <h1 className="px-3 font-extrabold mb-5 text-primarydark text-2xl ">Sign In</h1>

          {/* Email Input */}
          <div className="input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z" clipRule="evenodd" />
            </svg>
            <input type="email" placeholder="Email" className="input-et" value={email} onChange={(ev) => setEmail(ev.target.value)} />
          </div>

          {/* Password Input */}
          <div className="input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
            </svg>

            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-et" value={password} onChange={(ev) => setPassword(ev.target.value)} />
            <div type="button" className="" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? '🙈' : '👁'}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex w-full h-full mt-4 justify-between px-1">
            <div className="flex gap-2">
              <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe((prev) => !prev)} />
              Remember Me
            </div>
            <div>
              <Link to={'/forgotpassword'}>Forgot Password?</Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full py-4">
            <button type="submit" className="primary w-full">Sign in</button>
          </div>

          {/* Navigation Links */}
          <div className="container2">
            <div className="w-full h-full p-1">
              <Link to={'/register'}>
                <button className="text-black cursor-pointer rounded w-full h-full font-bold">Sign Up</button>
              </Link>
            </div>
          </div>

          <Link to={'/'}>
            <button className="secondary">Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
