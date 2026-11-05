interface AdminNotificationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseCategory: string;
  preferredCourses: string[];
  classType: string;
  classMode: string;
  preferredTime: string;
  goals?: string;
}

const labelStyle: React.CSSProperties = {
  padding: "8px 12px",
  fontWeight: 600,
  color: "#374151",
  background: "#f3f4f6",
  width: "38%",
  border: "1px solid #e5e7eb",
};

const valueStyle: React.CSSProperties = {
  padding: "8px 12px",
  color: "#111827",
  border: "1px solid #e5e7eb",
};

export default function AdminNotification({
  firstName,
  lastName,
  email,
  phone,
  courseCategory,
  preferredCourses,
  classType,
  classMode,
  preferredTime,
  goals,
}: AdminNotificationProps) {
  const rows: [string, string][] = [
    ["Name", `${firstName} ${lastName}`],
    ["Email", email],
    ["Phone", phone],
    ["Course category", courseCategory],
    [
      "Preferred courses",
      preferredCourses.length > 0 ? preferredCourses.join(", ") : "-",
    ],
    ["Class type", classType],
    ["Class mode", classMode],
    ["Preferred time", preferredTime],
    ["Goals", goals && goals.trim() !== "" ? goals : "-"],
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: 600,
        margin: "0 auto",
        padding: 24,
        color: "#111827",
      }}
    >
      <h2 style={{ margin: "0 0 8px" }}>New Drill Daily Registration</h2>
      <p style={{ margin: "0 0 16px", color: "#4b5563" }}>
        A new student has registered. Details are below.
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
      >
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <td style={labelStyle}>{label}</td>
              <td style={valueStyle}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}