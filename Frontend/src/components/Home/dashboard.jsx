import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token1");  // 🛠 fixed
    if (!token) {
      navigate("/login"); // redirect if not logged in
      return;
    }
  
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/dashboard", {  // 🛠 fixed URL
          headers: { Authorization: `Bearer ${token}` },  // 🛠 fixed
        });
  
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error(data.error);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [navigate]);
  

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10">
        Please login to view your dashboard.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>

      <div className="mb-6 p-4 bg-blue-100 rounded-lg">
        <p className="text-lg font-semibold">Welcome, {user.username}!</p>
        <p className="text-lg">
          Email: <span className="font-bold">{user.email}</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
