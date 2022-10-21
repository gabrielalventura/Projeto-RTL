import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém um heading h2 com o texto `Encountered pókemons`', () => {
    renderWithRouter(<App />);

    const headInfo = screen.getByRole('heading', { level: 2 });
    expect(headInfo).toBeInTheDocument();
    expect(headInfo).toHaveTextContent('Encountered pokémons');
  });

  it('Testa se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const pokemonsList = pokemons[1];
    // console.log(pokemonsList);
    // chamando o elemento [1] do array pois ele é o próximo pokemon após o primeiro pokemon renderizado inicialmente;

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    const nextPokemon = screen.getAllByTestId('pokemon-type');
    expect(nextPokemon[0]).toHaveTextContent(pokemonsList.type);
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const showingOnlyOne = screen.getAllByTestId('pokemon-type');
    expect(showingOnlyOne).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const dataTestid = 'data-testid';
    const info = 'pokemon-type-button';

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const electricButton = screen.getByRole('button', { name: 'Electric' });
    expect(electricButton).toBeInTheDocument();
    expect(electricButton).toHaveAttribute(dataTestid, info);

    const fireButton = screen.getByRole('button', { name: 'Fire' });
    expect(fireButton).toBeInTheDocument();
    expect(fireButton).toHaveAttribute(dataTestid, info);

    const bugButton = screen.getByRole('button', { name: 'Bug' });
    expect(bugButton).toBeInTheDocument();
    expect(bugButton).toHaveAttribute(dataTestid, info);

    const poisonButton = screen.getByRole('button', { name: 'Poison' });
    expect(poisonButton).toBeInTheDocument();
    expect(poisonButton).toHaveAttribute(dataTestid, info);

    const psychicButton = screen.getByRole('button', { name: 'Psychic' });
    expect(psychicButton).toBeInTheDocument();
    expect(psychicButton).toHaveAttribute(dataTestid, info);

    const normalButton = screen.getByRole('button', { name: 'Normal' });
    expect(normalButton).toBeInTheDocument();
    expect(normalButton).toHaveAttribute(dataTestid, info);

    const dragonButton = screen.getByRole('button', { name: 'Dragon' });
    expect(dragonButton).toBeInTheDocument();
    expect(dragonButton).toHaveAttribute(dataTestid, info);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', { name: 'All' });
    expect(resetButton).not.toBeDisabled();
    userEvent.click(resetButton);

    const pokemon = pokemons[0];
    const resetedPokedex = screen.getByTestId('pokemon-name');
    expect(resetedPokedex).toHaveTextContent(pokemon.name);
  });
});
