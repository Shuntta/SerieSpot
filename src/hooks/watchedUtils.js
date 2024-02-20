// watchedUtils.js
import { useState } from 'react';

const handleWatchedClick = async (movieId) => {
  // Obtenha o userId do localStorage
  const userId = localStorage.getItem('userId');

  // Verifique se o userId está disponível no localStorage
  if (!userId) {
    console.error('Usuário não autenticado');
    return;
  }

  try {
    // Faça uma solicitação POST para o backend para adicionar o filme assistido
    const response = await fetch('http://localhost:8080/watched', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: parseInt(userId),
        movieId: parseInt(movieId),
      }),
    });

    if (!response.ok) {
      throw new Error('Falha ao marcar o filme como assistido.');
    }

    console.log('Filme marcado como assistido com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar solicitação para adicionar filme à lista de assistidos:', error);
    // Exibir uma mensagem de erro ao usuário
    alert('Erro ao marcar o filme como assistido. Por favor, tente novamente mais tarde.');
  }
};

export default handleWatchedClick;

