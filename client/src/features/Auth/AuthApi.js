//! IMPORTANT: Now We dont Need to pass User ID (user.id) as in Backend It will take loggedIn UserId Automatically from req.user and Then Add to Api Call. Hence From Frontend we just need to hit on paticular Api Path without userId
//Fetching Authentication Details

// TODO-> In response of createUser(singnup) and loginUser(Login) only user id and role will come From backend

// To Post Signup Details
// Signup Api Call
const createUser = async (userData) => {
  const response = await fetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return { data };
};

// To Post and Match Login Details With DataBase
// Login user
// Login Api call
const loginUser = async (loginInfo) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      throw error;
    }
  } catch (error) {
    // to get the rejected condition called in slice we need to use (throw Keyword)
    // if we use promsie insted of async/await we use promise.reject()
    throw error;
  }
};

// check Whether user is login or not
const checkUser = async () => {
  try {
    const response = await fetch("/auth/check");
    if (response.ok) {
      const data = await response.json();
     
      return { data };
    } else {
      const error = await response.text();
      throw error;
    }
  } catch (error) {
    // to get the rejected condition called in slice we need to use (throw Keyword)
    // if we use promsie insted of async/await we use promise.reject()
    throw error;
  }
};

// Logout User
const signOut = async (userId) => {
  try {
    let response = await fetch("/auth/logout", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      return { data: "success" };
    } else {
      const error = await response.text();
      throw error;
    }
  } catch (error) {
   
    throw error;
  }
};

// Reset Password Request or Forgot Password
const resetPasswordRequest = async (email) => {
  try {
    const response = await fetch("/auth/reset-password-request", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      throw error;
    }
  } catch (error) {

    throw error;
  }
};

// Reset Password  or Forgot Password
const resetPassword = async (data) => {
  try {
    const response = await fetch("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      throw error;
    }
  } catch (error) {
    
    throw error;
  }
};

export {
  createUser,
  loginUser,
  signOut,
  checkUser,
  resetPasswordRequest,
  resetPassword,
};
