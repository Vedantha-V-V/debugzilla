import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Section from './Section';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../redux/slices/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setFormError(message);
    }

    if (isSuccess && user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    dispatch(login({ email, password }));
  };

  return (
    <Section>
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <div
            className="block relative p-7 bg-no-repeat bg-[length:100%_100%]
                    md:max-w-[24rem]"
            style={{ backgroundImage: "url(../src/assets/benefits/card-4.svg)" }}
          >
            <h2 className="h2 pb-5">Sign In</h2>

            {formError && (
              <div className="bg-color-3/20 text-color-3 p-3 rounded-md mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="block m-2">
                Email
              </label>
              <input
                className="w-[100%] h-[100%] p-1 mb-1 border-n-1/50 rounded-md size-1 bg-n-5"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <label htmlFor="password" className="block m-2">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-[100%] h-[100%] p-1 mb-1 border-n-1/50 rounded-md size-1 bg-n-5"
                  type={showPassword ? 'text' : 'password'} // Toggle input type
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-n-3"
                  onMouseDown={() => setShowPassword(true)} // Show password on mouse down
                  onMouseUp={() => setShowPassword(false)} // Hide password on mouse up
                  onMouseLeave={() => setShowPassword(false)} // Hide password if mouse leaves the button
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <Button type="submit" className="mt-5 w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-5 text-center">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-color-1">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Signin;