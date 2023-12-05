import jwt_decode from "jwt-decode";

export const isLoggedIn = () => {
  let data = localStorage.getItem("token");
  return !!data;
};
export const getRole = () => {
  let data = localStorage.getItem("token");
  let token = JSON.parse(data);
  let decodedToken = token ? jwt_decode(token) : null;
  // console.log(token);
  return decodedToken == null ? "" : decodedToken?.role;
};

export const getUsers = () => {
  let data = localStorage.getItem("user");
  let user = JSON.parse(data);
  // console.log(data);
  return user;
};

export const setToken = (data) => {
  localStorage.setItem("token", JSON.stringify(data));
};

export const setUser = (data) => {
  // console.log(data);
  localStorage.setItem("user", JSON.stringify(data));
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const headers = () => {
  let token = localStorage.getItem("token");
  // console.log(token);
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    localStorage.removeItem("token");
    window.location.reload();
  } else {
    const timeUntilExpiry = decodedToken.exp - currentTime;
    setTimeout(checkTokenExpiration, timeUntilExpiry * 1000);
  }
};

export const formattedDate = (data) => {
  const date = new Date(data);

  return date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};
