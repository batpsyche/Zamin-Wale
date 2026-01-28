"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const getToken = (tokenType = "access") => {
	try {
		const token = cookies().get(`${process.env.NEXT_PUBLIC_COOKIE_KEY}_${tokenType}`);
		if (!token) {
			console.error(`Token of type ${tokenType} not found in cookies.`);
			return null;
		}
		console.log(`Retrieved token of type ${tokenType}:`, token.value);
		return token.value;
	} catch (error) {
		console.error("Error retrieving token:", error);
		return null;
	}
};

const handleTokenRefreshFailure = () => {
	try {
		const cookieKey = process.env.NEXT_PUBLIC_COOKIE_KEY;
		cookies().delete(`${cookieKey}_access`);
		console.log("Access token deleted due to refresh failure.");
	} catch (error) {
		console.error("Error handling token refresh failure:", error);
	}
};

const addAuthorizationHeader = (headers, token, fallbackToken) => {
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	} else if (fallbackToken) {
		headers.Authorization = `Bearer ${fallbackToken}`;
	} else {
		throw new Error("Token not found for authorization");
	}
};

const logApiDetails = (baseUrl, endpoint, options, res) => {
	const apiDetails = {
		method: options.method || "GET",
		headers: options.headers,
		apiUrl: `${baseUrl}${endpoint}`,
		status: res.status,
		statusText: res.statusText,
	};
	console.log(
		`${apiDetails.status} - ${apiDetails.method}: ${apiDetails.apiUrl}\nStatus: ${apiDetails.statusText}`
	);
};

const customFetch = async (
	baseUrl,
	endpoint,
	options = {
		headers: {},
		noContentType: false,
	},
	tokenType = "access"
) => {
	try {
		const headers = {
			...(options.headers || {}),
		};

		if (!options.noContentType && !headers["Content-Type"]) {
			headers["Content-Type"] = "application/json";
		}

		const token = tokenType ? await getToken(tokenType) : null;
		const fallbackToken = options?.fallbackToken;

		if (tokenType !== null) {
			addAuthorizationHeader(headers, token, fallbackToken);
		}

		if (tokenType === "access" && token && fallbackToken) {
			try {
				const decodedToken = jwtDecode(token || fallbackToken);
				console.log(decodedToken);

				if (!decodedToken || !decodedToken.id) {
					throw new Error("Invalid access token");
				}
				console.log("Decoded token:", decodedToken);
				options.id = decodedToken.id;
			} catch (error) {
				console.error("Failed to decode access token:", error);
				throw new Error("Failed to decode access token");
			}
		}

		console.log("Making API call to:", `${baseUrl}${endpoint}`);
		const res = await fetch(`${baseUrl}${endpoint}`, {
			...options,
			headers,
		});

		logApiDetails(baseUrl, endpoint, options, res);

		const contentType = res.headers.get("content-type");
		let responseContent;

		if (contentType && contentType.includes("application/json")) {
			responseContent = await res.json();
		} else if (!contentType && !contentType.includes("application/json")) {
			responseContent = await res.json();
		}
		else {
			responseContent = await res.text();
		}

		// try {
		// 	responseContent = await res.json();
		// 	console.log("API response JSON:");
		// } catch (parseError) {
		// 	console.error("Failed to parse API response:");
		// 	throw new Error("Failed to parse API response");
		// }

		if (!res.ok) {
			if (res.status === 401) {
				handleTokenRefreshFailure();
				throw new Error("Token expired. Please reauthenticate.");
			}
			const errorMessage = responseContent?.results?.data?.error || "API error occurred";
			console.error(`API Error: ${errorMessage}`);
			throw new Error(errorMessage);
		}

		return responseContent;
	} catch (error) {
		console.error(`Error in customFetch: ${error.message}`);
		throw error;
	}
};

export const fetchWithToken = async (endpoint, options = {}) =>
	customFetch(process.env.API_URL, endpoint, options, "access");

export const fetchWithoutToken = async (endpoint, options = {}) =>
	customFetch(process.env.API_URL, endpoint, options, null);
