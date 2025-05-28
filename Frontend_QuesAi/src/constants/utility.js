export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, "0");
  const monthShort = date.toLocaleString("en-US", { month: "short" });
  const yearShort = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${monthShort} ${yearShort} | ${hours}:${minutes}`;
};


export const handleLogOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("login");
  window.location.href = "/";
};
