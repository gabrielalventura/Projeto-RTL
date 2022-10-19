import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', { level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundTitle).toHaveTextContent('Page requested not found');
  });

  it('Teste se a página mostra a imagem da URL determinada', () => {
    renderWithRouter(<NotFound />);

    const nFoundImg = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(nFoundImg).toBeInTheDocument();
    expect(nFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
