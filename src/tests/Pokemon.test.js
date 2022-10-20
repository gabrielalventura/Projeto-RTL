import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  it('Testa se o card é renderizado corretamente', () => {
    renderWithRouter(<App />);
    const pokemonList = pokemons;
    const weight = pokemonList[0].averageWeight;

    const showedPokemon = screen.getByTestId('pokemon-name');
    expect(showedPokemon).toHaveTextContent(pokemonList[0].name);

    const showedType = screen.getByTestId('pokemon-type');
    expect(showedType).toHaveTextContent(pokemonList[0].type);

    const showedWeight = screen.getByTestId('pokemon-weight');
    expect(showedWeight).toHaveTextContent(`${weight.value} ${weight.measurementUnit}`);

    const showedImg = screen.getByAltText(/Pikachu sprite/i);
    expect(showedImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se há no card um link de navegação para exibir mais detalhes do Pokemon e se o redirecionamento é correto', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonTest = pokemons[0];

    const toMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(toMoreDetails).toBeInTheDocument();

    userEvent.click(toMoreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemonTest.id}`);
  });

  it('Testa os ícones de pokemons favoritados', () => {
    renderWithRouter(<App />);

    const pokemonfavorited = pokemons[0];
    const toDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(toDetails);

    const favorit = screen.getByText('Pokémon favoritado?');
    userEvent.click(favorit);

    const icon = screen.getByAltText(`${pokemonfavorited.name} is marked as favorite`);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
