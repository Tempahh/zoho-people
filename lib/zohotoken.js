import axios from "axios";

let cachedToken = {
  accessToken: process.env.ZOHO_ACCESS_TOKEN,
  expiresAt: 0, // timestamp in ms
};

/**
 * Refresh Zoho access token using the refresh token
 */
async function refreshAccessToken() {
  const response = await axios.post("https://accounts.zoho.com/oauth/v2/token", null, {
    params: {
      refresh_token: process.env.ZOHO_ACCESS_TOKEN,
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token",
    },
  });
  console.log("Zoho token refresh response:", response.data);

  cachedToken.accessToken = response.data.access_token;
  cachedToken.expiresAt = Date.now() + response.data.expires_in * 1000 - 60000; // refresh 1 min early

  console.log("Zoho token refreshed:", cachedToken.accessToken);
  return cachedToken.accessToken;
}

/**
 * Get a valid access token (refresh if expired)
 */
export async function getValidAccessToken() {
  if (!cachedToken.accessToken || Date.now() > cachedToken.expiresAt) {
    return await refreshAccessToken();
  }
  return cachedToken.accessToken;
}
