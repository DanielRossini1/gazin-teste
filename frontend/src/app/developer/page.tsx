"use client";

import React, { useState, useEffect } from 'react';
import { fetchDevelopers } from '@/services/developerHttp';
import { Developer } from '@/types/developer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const DeveloperPage: React.FC = () => {
  const [developerList, setDeveloperList] = useState<Developer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Column 1', width: 150 },
    { field: 'idade', headerName: 'Column 2', width: 150 },
  ];

  useEffect(() => {
    fetchDevelopers().then(data => {
      console.log(data);
      setDeveloperList(data);
    });
  }, []);

  if (!developerList.length) {
    return (
      <div>
        <p>Nenhum desenvolvedor cadastrado!</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Developers</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Developer</button>
      <DataGrid rows={developerList} columns={columns} />
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

export default DeveloperPage;