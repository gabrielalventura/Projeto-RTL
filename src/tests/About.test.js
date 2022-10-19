import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../pages/About';

describe('Testa o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitleText = screen.getByText('About Pokédex');
    expect(aboutTitleText).toBeInTheDocument();
  });

  it('Teste o heading h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { level: 2 }, { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const parag1 = screen.getByText(/digital encyclopedia/i);
    const parag2 = screen.getByText(/can filter Pokémons/i);
    expect(parag1).toHaveTextContent(
      /This application simulates a Pokédex, a digital encyclopedia containing all Pokémons/i,
    );
    expect(parag2).toHaveTextContent(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  }); // desenvolvida através de consulta a documentação do RTL e do site https://wilbertom.com/post/react-testing-library-testing-a-node-attribute/
});
