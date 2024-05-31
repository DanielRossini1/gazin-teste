import { Nivel } from "../types/nivel";

const API_URL = 'http://localhost:3000/api';

export async function fetchNivel(): Promise<Nivel[]> {
  const response = await fetch(`${API_URL}/niveis`);
  const data = await response.json();
  return data;
}

export async function updateNivel(id: number, developer: Nivel): Promise<Nivel> {
  const response = await fetch(`${API_URL}/niveis/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(developer),
  });
  return response.json();
}

export async function deleteNivel(id: number): Promise<void>{
  const response = await fetch(`${API_URL}/niveis/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

