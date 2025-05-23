export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const editedDate = new Date(dateString);
  const seconds = Math.floor((now - editedDate) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

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
