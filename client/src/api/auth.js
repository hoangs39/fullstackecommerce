import { API_URL } from "../GlobalVar";

const register = async (userType, userData) => {
  try {
    const response = await fetch(API_URL + "/api/auth/register/" + userType, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    } 
  } catch (error) {
    console.error("Error sending registration data:", error);
  }
};


const login = async (userType, userData) => {
  // alert(userData);
  try {
    const response = await fetch(API_URL + "/api/auth/login/" + userType, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Login failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending registration data:", error);
  }
};


export { register, login };
