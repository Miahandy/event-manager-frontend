const StatusBadge = ({ status }) => {
  let color = "";

  if (status === "pending") color = "orange";
  if (status === "accepted") color = "green";
  if (status === "rejected") color = "red";

  return (
    <span style={{ color }}>
      {status}
    </span>
  );
};

export default StatusBadge;