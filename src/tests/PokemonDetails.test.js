import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente PokemonDetails', () => {
  it('Testa a renderização das informações detalhadas na tela', () => {
    renderWithRouter(<App />);

    const moreDetails = 'More details';
    const moreDetailsBttn = screen.getByRole('link', { name: `${moreDetails}` });
    userEvent.click(moreDetailsBttn);

    // A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;
    const singularPokemonDetail = pokemons[0];
    const detailsText = screen.getByText(`${singularPokemonDetail.name} Details`);
    expect(detailsText).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do pokémon selecionado; -NEGAR-;
    expect(moreDetailsBttn).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary;
    const verifySummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(verifySummary).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado;
    const verifyParagraph = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    expect(verifyParagraph).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com mapas de localização', () => {
    renderWithRouter(<App />);

    const moreDetailsBttn = screen.getByText(/more details/i);
    userEvent.click(moreDetailsBttn);

    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do pokémon exibido;
    const selectPokemon = pokemons[0];
    const mapsText = screen.getByRole('heading', { level: 2, name: `Game Locations of ${selectPokemon.name}` });
    expect(mapsText).toBeInTheDocument();

    const pokemonLocationsNames = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const pokemonLocationsImgs = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];

    expect(pokemonLocationsNames).toHaveLength(2);
    const mapImage = screen.getAllByAltText(`${selectPokemon.name} location`);

    expect(mapImage[0]).toHaveAttribute('src', `${pokemonLocationsImgs[0]}`);
    expect(mapImage[1]).toHaveAttribute('src', `${pokemonLocationsImgs[1]}`);
    expect(mapImage[0]).toHaveAttribute('alt', `${selectPokemon.name} location`);
    expect(mapImage[1]).toHaveAttribute('alt', `${selectPokemon.name} location`);
  });

  it('Testa se o usuário pode favoritar um pokémon através da página detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = 'More details';
    const moreDetailsBttn = screen.getByRole('link', { name: `${moreDetails}` });
    userEvent.click(moreDetailsBttn);

    const checkFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();

    userEvent.click(checkFavorite);
    expect(checkFavorite).not.toBeChecked();

    const verifyLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(verifyLabel).toBeInTheDocument();
  });
});
