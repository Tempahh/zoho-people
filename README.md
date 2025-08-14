# Zoho People Dashboard

## Overview

This project is a **Next.js application** that integrates with **Zoho People** to fetch employee data via their API, transform it into a readable format, store it in a **MongoDB** database, and display it in a user-friendly table.

---

## Features

1. **Fetch Data from Zoho People API**

   * Connects to Zoho People using OAuth tokens.
   * Retrieves employee records in their original Zoho format.

2. **Transform and Normalize Data**

   * Maps Zoho's raw data into a structured, readable format.
   * Ensures consistency and handles missing values gracefully.

3. **Store in MongoDB**

   * Saves transformed employee data into MongoDB.
   * Uses `updateOne` with `upsert` or `.new` to avoid duplicate entries.

4. **Populate Viewing Table**

   * Frontend displays the data in a **dynamic HTML table**.
   * Employee photos, names, emails, department, role, and status are included.
   * Supports empty fields with placeholders for readability.

---

## Tech Stack

* **Frontend:** Next.js, React, Next/Image
* **Backend:** Node.js, API routes
* **Database:** MongoDB (Atlas or local)
* **HTTP Client:** Axios (for API calls)
* **Authentication:** Zoho OAuth token

---

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Tempahh/zoho-people.git
   cd zoho-people
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add:

   ```env
   ZOHO_API_URL=<your_zoho_api_url>
   ZOHO_ACCESS_TOKEN=<your_zoho_access_token>
   MONGODB_URI=<your_mongodb_connection_string>
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) to see the employee table.

---

## How It Works

1. **API Call**

   * The backend makes a GET request to Zoho People API using your access token.

2. **Data Transformation**

   * Maps Zoho fields to your application's internal format:

     * `First Name`, `Last Name`, `Email address`, `Employee ID`, `Department`, `Zoho Role`, `Employee Status`, `Photo`, `Added Time`, etc.

3. **Database Update**

   * Connects to MongoDB and inserts or updates records using `updateOne` or `.new` (Mongoose).

4. **Frontend Table**

   * Fetches the stored data from your API route.
   * Populates a table with employee info and thumbnails.

---

## Notes

* Make sure your **Zoho OAuth token is valid**, or API requests will fail.
* All empty fields are displayed with `—` in the table.
* Employee photos are resized and optimized using `next/image`.

