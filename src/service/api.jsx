const API_URL = "http://localhost:8080/api/v1/remittance";

// Create a new remittance
export const createRemittance = async (data) => {
  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create remittance");
  return response.json();
};

// Fetch all remittances
export const getAllRemittances = async () => {
  const response = await fetch(`${API_URL}/all`);
  if (!response.ok) throw new Error("Failed to fetch remittances");
  return response.json();
};

// Fetch remittance by ID
export const getRemittanceById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch remittance");
  return response.json();
};

// Update remittance
export const updateRemittance = async (id, data) => {
  const response = await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update remittance");
  return response.json();
};
