const API_URL = import.meta.env.VITE_API_URL;

const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    setUser(data.user);
    setToken(data.token);

    // Save to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
