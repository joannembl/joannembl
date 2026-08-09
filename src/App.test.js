import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jo-anne\'s portfolio and featured work', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /jo-anne mae liberato/i })).toBeInTheDocument();
  expect(screen.getByText('Crafted Digital Mini OS')).toBeInTheDocument();
});
