import connectToDatabase from "../../lib/mongodb";
import Employee from "../../models/employee";
import axios from "axios";
import { getValidAccessToken } from "../../lib/zohotoken";

export default async function handler(req, res) {

    const accessToken = await getValidAccessToken();
    console.log("Using Zoho access token:", accessToken);
  try {
    console.log("Fetching Zoho data...");
    const response = await axios.get(process.env.ZOHO_API_URL, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    });

    console.log("Zoho response received:", response.data);

    if (!response.data || !response.data) {
      console.error("No data returned from Zoho");
      return res.status(500).json({ error: "No data returned from Zoho" });
    }

    const employees = response.data.map((record) => ({
      recordId: record.recordId,
      Photo_downloadUrl: record.Photo_downloadUrl || null,
      firstName: record["First Name"] || null,
      lastName: record["Last Name"] || null,
      email: record["Email address"] || null,
      employeeId: record["Employee ID"] || null,
      department: record.Department || null,
      zohoRole: record["Zoho Role"] || null,
      employeeStatus: record["Employee Status"] || null,
      addedTime: record["Added Time"] || null,
    }));

    console.log("Connecting to MongoDB...");
    await connectToDatabase();
    console.log("MongoDB connected.");

    const ops = employees.map((emp) => {
      console.log("Processing employee:", emp.recordId);
      return {
        updateOne: {
          filter: { recordId: emp.recordId },
          update: emp,
          upsert: true,
        }
      };
    });

    console.log("Writing to MongoDB...");
    const result = await Employee.bulkWrite(ops);
    console.log("MongoDB write result:", result);

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error in /api/employees:", error);
    res.status(500).json({ error: error.message });
  }
}
