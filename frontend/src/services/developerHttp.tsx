import { Developer } from "../types/developer";

const API_URL = 'http://localhost:3000/api';

export async function fetchDevelopers(): Promise<Developer[]> {
  const response = await fetch(`${API_URL}/desenvolvedores`);
  return response.json();
}

export async function updateDeveloper(id: number, developer: Developer): Promise<Developer> {
  const response = await fetch(`${API_URL}/desenvolvedores/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(developer),
  });
  return response.json();
}

export async function deleteDeveloper(id: number): Promise<void>{
  const response = await fetch(`${API_URL}/desenvolvedores/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

