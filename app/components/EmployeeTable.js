import Image from "next/image";

export default function EmployeeTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No employee data found.</p>;
  }

  console.log(data);
  return (
    <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Photo</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Employee ID</th>
          <th>Department</th>
          <th>Zoho Role</th>
          <th>Employee Status</th>
          <th>Date Added</th>
        </tr>
      </thead>
      <tbody>
        {data.map((emp) => (
          <tr key={emp.recordId}>
            <td>
              {emp.Photo_downloadUrl ? (
                <Image
                  src={emp.Photo_downloadUrl}
                  alt="profile"
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                "N/A"
              )}
            </td>
            <td>{emp["firstName"] || "—"}</td>
            <td>{emp["lastName"] || "—"}</td>
            <td>{emp["email"] || "—"}</td>
            <td>{emp["employeeId"] || "—"}</td>
            <td>{emp["department"] || "—"}</td>
            <td>{emp["zohoRole"] || "—"}</td>
            <td>{emp["employeeStatus"] || "—"}</td>
            <td>{emp["addedTime"] || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
