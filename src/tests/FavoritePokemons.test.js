import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se exibe a mensagem de `No favorite pokemon found` em caso de não haver pokemon favoritado', () => {
    const withoutFavorite = [];

    renderWithRouter(<FavoritePokemons pokemons={ withoutFavorite } />);
    const noFavoriteText = screen.getByText('No favorite pokemon found');
    expect(noFavoriteText).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const favorites = screen.getAllByTestId('pokemon-name');
    expect(favorites).toHaveLength(pokemons.length);
  });
});
