"use client";

import React, { useState, useEffect } from 'react';
import { fetchDevelopers } from '@/services/developerHttp';
import { Developer } from '@/types/developer';

const DevelopersList: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { 
    fetchDevelopers().then(data => {
      console.log(data);
      setDevelopers(data) 
    }); 
  }, []);

  if (!developers.length) {
    return <div>
      <p>nenhum desenvolvedor cadastrado!</p>
    </div>
  }

  return (
    <div>
      <h1>Developers</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Developer</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.map(developer => (
            <tr key={developer.id}>
              <td>{developer.nome}</td>
              <td>{developer.nivel.nivel}</td>
              <td>
                <button onClick={() => handleEdit(developer.id)}>Edit</button>
                <button onClick={() => handleDelete(developer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {isModalOpen && <DeveloperForm onClose={() => setIsModalOpen(false)} />} */}
    </div>
  );

  function handleEdit(id: number) {
    // Implementar a lógica de edição
  }

  function handleDelete(id: number) {
    // Implementar a lógica de exclusão com confirmação
  }
};

export default DevelopersList;