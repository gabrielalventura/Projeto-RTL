import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('Testa se existe no topo o conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada corretamente para Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se a aplicação é redirecionada corretamente para About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada corretamente para Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se a aplicação é redirecionada para a página Not Found quando utilizado URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    const unknownURL = '/anything';

    act(() => {
      history.push(unknownURL);
    });

    const notFoundText = screen.getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
