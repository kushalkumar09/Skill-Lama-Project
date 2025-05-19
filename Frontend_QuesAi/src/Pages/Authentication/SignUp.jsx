import { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { validateSignup } from "../../constants/validation";
import { AuthEndPoints } from "../../constants/endpoints";
import "./Login.css";
import { AuthContext } from "../../contexts/AuthContext";

function Signup() {
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;

    const validation = validateSignup(email, password, confirm);
    if (!validation.success) {
      setError(validation.message);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { endPoint, method } = AuthEndPoints.SignUp;
      const response = await fetch(endPoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password }),
      });

      const result = await response.json();
  

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      alert("Signup successful! User created successfully.");
      localStorage.setItem("token", result.token);
      localStorage.setItem("login", "true");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-side">
        {/* Reuse branding content from Login */}
        <div className="left-content">
          <svg
            width="225"
            viewBox="0 0 271 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_6_2842)">
              <path
                d="M94.0667 8.0263C104.841 8.0263 114.441 15.8961 114.441 28.6806C114.441 34.2639 112.6 38.8981 109.583 42.3566L114.329 47.6056L109.249 51.9594L104.392 46.599C101.322 48.3282 97.7482 49.2774 94.0631 49.2774C83.3459 49.2774 73.7432 41.4075 73.7432 28.677C73.7432 15.9465 83.3459 8.02271 94.0631 8.02271L94.0667 8.0263ZM94.0667 41.7994C95.796 41.7994 97.5828 41.465 99.1467 40.7963L92.9486 33.9871L98.0861 29.5758L104.284 36.4965C105.625 34.4868 106.463 31.8623 106.463 28.6267C106.463 19.6962 100.211 15.4539 94.0703 15.4539C87.9297 15.4539 81.7316 19.6962 81.7316 28.6267C81.7316 37.5571 87.9837 41.7994 94.0703 41.7994H94.0667Z"
                fill="white"
              />
              <path
                d="M138.168 45.4847C136.662 48.0517 133.48 49.1698 130.575 49.1698C123.931 49.1698 120.135 44.3127 120.135 38.3411V20.98H127.559V36.8347C127.559 39.905 129.123 42.3605 132.581 42.3605C136.04 42.3605 137.773 40.1279 137.773 36.9462V20.98H145.197V43.4786C145.197 45.5998 145.366 47.498 145.477 48.4471H138.387C138.276 47.8899 138.165 46.6064 138.165 45.4883L138.168 45.4847Z"
                fill="white"
              />
              <path
                d="M177.637 40.5737C176.242 45.3194 171.888 49.2812 165.133 49.2812C157.597 49.2812 150.953 43.8669 150.953 34.5985C150.953 25.8335 157.428 20.1423 164.464 20.1423C172.948 20.1423 178.028 25.5567 178.028 34.3756C178.028 35.4362 177.917 36.5543 177.917 36.6658H158.266C158.435 40.2933 161.505 42.9178 165.186 42.9178C168.649 42.9178 170.547 41.1885 171.438 38.7294L177.637 40.5701V40.5737ZM170.716 31.5858C170.604 28.8499 168.818 26.1714 164.575 26.1714C160.725 26.1714 158.604 29.0728 158.435 31.5858H170.716Z"
                fill="white"
              />
              <path
                d="M187.908 39.3979C188.077 41.5766 189.695 43.5863 192.931 43.5863C195.386 43.5863 196.558 42.3028 196.558 40.8504C196.558 39.6208 195.72 38.6178 193.599 38.172L189.972 37.3343C184.669 36.1623 182.267 32.9805 182.267 29.1265C182.267 24.2155 186.621 20.1385 192.539 20.1385C200.355 20.1385 202.979 25.1071 203.313 28.0659L197.115 29.4608C196.892 27.843 195.72 25.7758 192.593 25.7758C190.64 25.7758 189.077 26.9478 189.077 28.5117C189.077 29.8527 190.08 30.6868 191.59 30.9672L195.497 31.8049C200.912 32.923 203.648 36.2162 203.648 40.2356C203.648 44.7008 200.186 49.2775 192.984 49.2775C184.723 49.2775 181.875 43.917 181.541 40.7928L187.904 39.3979H187.908Z"
                fill="white"
              />
              <path
                d="M214.31 38.675C217.158 38.675 219.448 40.9652 219.448 43.755C219.448 46.5449 217.158 48.835 214.31 48.835C211.463 48.835 209.23 46.5449 209.23 43.755C209.23 40.9652 211.521 38.675 214.31 38.675Z"
                fill="white"
              />
              <path
                d="M251.826 36.2162H232.901L228.044 48.4398H224.247L240.267 8.86047H244.509L260.53 48.4398H256.733L251.822 36.2162H251.826ZM234.184 32.9769H250.542L242.334 12.3766L234.184 32.9769Z"
                fill="white"
              />
              <path
                d="M267.397 48.4433V8.86401H270.971V48.4433H267.397Z"
                fill="white"
              />
              <path
                d="M29.0163 55.7021C14.5637 55.7021 2.85059 43.989 2.85059 29.5364C2.85059 15.0838 14.5673 3.37073 29.0163 3.37073C43.4653 3.37073 55.182 15.0838 55.182 29.5364"
                stroke="white"
                stroke-width="5.04403"
                stroke-miterlimit="10"
              />
              <path
                d="M18.6191 41.9759H21.8548C24.6339 41.9759 26.888 39.7217 26.888 36.9426V31.1436C26.888 28.3645 29.1422 26.1104 31.9213 26.1104H32.2808C35.0599 26.1104 37.3141 28.3645 37.3141 31.1436V50.6043C37.3141 53.3834 39.5682 55.6375 42.3473 55.6375C45.1264 55.6375 47.3806 53.3834 47.3806 50.6043V44.4925C47.3806 41.7134 49.6347 39.4592 52.4138 39.4592H57.4471"
                stroke="white"
                stroke-width="5.04403"
                stroke-miterlimit="10"
              />
            </g>
            <defs>
              <clipPath id="clip0_6_2842">
                <rect
                  width="270.641"
                  height="57.3754"
                  fill="white"
                  transform="translate(0.330078 0.850342)"
                />
              </clipPath>
            </defs>
          </svg>
          <h1>Start your journey with Ques.AI</h1>
          <p>Create your account and transform your ideas with AI!</p>
        </div>
      </div>

      <div className="right-side">
         <svg
          width="60"
          viewBox="0 0 106 107"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M52.8341 101.442C26.2663 101.442 4.73438 79.9099 4.73438 53.3421C4.73438 26.7742 26.2729 5.24231 52.8341 5.24231C79.3954 5.24231 100.934 26.7742 100.934 53.3421"
            stroke="#7E22CE"
            stroke-width="9.27232"
            stroke-miterlimit="10"
          />
          <path
            d="M33.7207 76.2093H39.6687C44.7774 76.2093 48.9212 72.0655 48.9212 66.9568V56.2966C48.9212 51.1879 53.065 47.0441 58.1737 47.0441H58.8346C63.9433 47.0441 68.0871 51.1879 68.0871 56.2966V92.0707C68.0871 97.1794 72.2309 101.323 77.3396 101.323C82.4483 101.323 86.5921 97.1794 86.5921 92.0707V80.8355C86.5921 75.7268 90.7359 71.583 95.8446 71.583H105.097"
            stroke="#7E22CE"
            stroke-width="9.27232"
            stroke-miterlimit="10"
          />
        </svg>
        <h2>
          Join <span>Ques.AI</span>
        </h2>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="login-error">{error}</p>}
          <input type="text" ref={userRef} placeholder="Username" required />
          <input type="email" ref={emailRef} placeholder="Email" required />
          <input type="password" ref={passwordRef} placeholder="Password" required />
          <input type="password" ref={confirmRef} placeholder="Confirm Password" required />

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>

          <p className="signup-link">
            Already have an account? <Link to="/userlogin">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
