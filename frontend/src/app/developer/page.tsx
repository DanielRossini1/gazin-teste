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
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import useFetchData from '@/hooks/useFetchData';
import { Developer } from '@/types/developer';
import { Nivel } from '@/types/nivel';
import Link from 'next/link';

const developerApiUrl = process.env.NEXT_PUBLIC_API_URL + '/desenvolvedores';
const nivelApiUrl = process.env.NEXT_PUBLIC_API_URL + '/niveis';

const Developers: React.FC = () => {
  const { data: developers, loading: loadingDevelopers, error: errorDevelopers, refetch: refetchDevelopers } = useFetchData<Developer[]>(developerApiUrl);
  const { data: niveis, loading: loadingNiveis, error: errorNiveis } = useFetchData<Nivel[]>(nivelApiUrl);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteDeveloperId, setDeleteDeveloperId] = useState<number | null>(null);
  const [editDeveloper, setEditDeveloper] = useState<Developer | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<Developer>();

  const handleAddOrEdit: SubmitHandler<Developer> = async (formData: Developer) => {
    console.log(formData);
    const developerPayload = {
      nivel_id: formData.nivel.id,
      nome: formData.nome,
      sexo: formData.sexo,
      data_nascimento: formData.dataNascimento,
      hobby: formData.hobby,
      idade: formData.idade
    }
    
    if (editDeveloper) {
      await fetch(`${developerApiUrl}/${editDeveloper.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(developerPayload)
      });
    } else {
      await fetch(developerApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(developerPayload)
      });
    }
    refetchDevelopers();
    handleClose();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${developerApiUrl}/${id}`, { method: 'DELETE' });
    refetchDevelopers();
  };

  const handleDeleteConfirm = (id: number) => {
    setDeleteDeveloperId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteDeveloperId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteDeveloperId !== null) {
      await handleDelete(deleteDeveloperId);
    }
    handleConfirmClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleOpen = (developer?: Developer) => {
    setEditDeveloper(developer || null);
    setOpen(true);
    if (developer) {
      reset(developer);
      setValue('dataNascimento', new Date(developer.dataNascimento).toISOString().substring(0, 10));
    }
  };

  if (loadingDevelopers || loadingNiveis) return <p>Carregando...</p>;
  if (errorDevelopers || errorNiveis) return <p>Erro: {errorDevelopers || errorNiveis}</p>;

  return (
    <Container>
      <h1>Gerenciar Desenvolvedores</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Adicionar Desenvolvedor
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>Data de Nascimento</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Hobby</TableCell>
            <TableCell>Nível</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {developers?.map(developer => (
            <TableRow key={developer.id}>
              <TableCell>{developer.id}</TableCell>
              <TableCell>{developer.nome}</TableCell>
              <TableCell>{developer.sexo}</TableCell>
              <TableCell>{new Date(developer.dataNascimento).toLocaleDateString()}</TableCell>
              <TableCell>{developer.idade}</TableCell>
              <TableCell>{developer.hobby}</TableCell>
              <TableCell>{developer.nivel.nivel}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(developer)}>Editar</Button>
                <Button onClick={() => handleDeleteConfirm(developer.id)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editDeveloper ? 'Editar Desenvolvedor' : 'Adicionar Desenvolvedor'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleAddOrEdit)}>
            <TextField
              {...register('nome', { required: true })}
              label="Nome"
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="sexo-label">Sexo</InputLabel>
              <Select
                {...register('sexo', { required: true })}
                labelId="sexo-label"
                label="Sexo"
                defaultValue=""
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Feminino</MenuItem>
              </Select>
            </FormControl>
            <TextField
              {...register('dataNascimento', { required: true })}
              label="Data de Nascimento"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setValue('dataNascimento', new Date(e.target.value).toISOString().substring(0, 10))}
            />
            <TextField
              {...register('idade', { required: true })}
              label="Idade"
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('hobby', { required: true })}
              label="Hobby"
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="nivel-label">Nível</InputLabel>
              <Select
                {...register('nivel.id', { required: true })}
                labelId="nivel-label"
                label="Nível"
                defaultValue=""
              >
                {niveis?.map(nivel => (
                  <MenuItem key={nivel.id} value={nivel.id}>
                    {nivel.nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancelar</Button>
              <Button type="submit" color="primary">{editDeveloper ? 'Atualizar' : 'Adicionar'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir este desenvolvedor?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="primary">Confirmar</Button>
        </DialogActions>
      </Dialog>
      <Link href="/nivel" color="primary">Niveis</Link>
    </Container>
  );
};

export default Developers;