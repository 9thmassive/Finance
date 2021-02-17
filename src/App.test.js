//first three rows - from Mariam
/*import React from 'react';
import ReactDOM from 'react-dom';
import App2 from './App2';*/

import { render, screen } from '@testing-library/react'
import App from './App'
import 'bootstrap/dist/css/bootstrap.main.css'

test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})


//first paragraph - from Mariam
/*it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App2 />, div);
    ReactDOM.unmountComponentAtNode(div);
  });*/
