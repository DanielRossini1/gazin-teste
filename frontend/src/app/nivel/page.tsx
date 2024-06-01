'use client';

import React, { useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import useFetchData from '@/hooks/useFetchData';
import { Nivel } from '@/types/nivel';
import Link from 'next/link';

const nivelApiUrl = process.env.NEXT_PUBLIC_API_URL + '/niveis';

const Niveis: React.FC = () => {
  const { data: niveis, loading, error, refetch } = useFetchData<Nivel[]>(nivelApiUrl);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteNivelId, setDeleteNivelId] = useState<number | null>(null);
  const [editNivel, setEditNivel] = useState<Nivel | null>(null);
  const { register, handleSubmit, reset } = useForm<Nivel>();

  const handleAddOrEdit: SubmitHandler<Nivel> = async (formData: Nivel) => {
    if (editNivel) {
      await fetch(`${nivelApiUrl}/${editNivel.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch(nivelApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }
    refetch();
    handleClose();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${nivelApiUrl}/${id}`, { method: 'DELETE' });
    refetch();
  };

  const handleDeleteConfirm = (id: number) => {
    setDeleteNivelId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteNivelId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteNivelId !== null) {
      await handleDelete(deleteNivelId);
    }
    handleConfirmClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleOpen = (nivel?: Nivel) => {
    setEditNivel(nivel || null);
    setOpen(true);
    if (nivel) reset(nivel);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <Container>
      <h1>Gerenciar Níveis</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Adicionar Nível
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {niveis?.map(nivel => (
            <TableRow key={nivel.id}>
              <TableCell>{nivel.id}</TableCell>
              <TableCell>{nivel.nivel}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(nivel)}>Editar</Button>
                <Button onClick={() => handleDeleteConfirm(nivel.id)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editNivel ? 'Editar Nível' : 'Adicionar Nível'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleAddOrEdit)}>
            <TextField
              {...register('nivel', { required: true })}
              label="Nome"
              fullWidth
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancelar</Button>
              <Button type="submit" color="primary">{editNivel ? 'Atualizar' : 'Adicionar'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir este nível?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="primary">Confirmar</Button>
        </DialogActions>
      </Dialog>
      <Link href="/developer" color="primary">Desenvolvedores</Link>
    </Container>
  );
};

export default Niveis;