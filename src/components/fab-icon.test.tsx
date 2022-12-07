import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

import FabIcon from './fab-icon'

describe('FavIcon', () => {
  it('should render a button with label', () => {
    render(<FabIcon label='New post' />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByLabelText(/new post/i)).toBeInTheDocument()
  })

  it('should listen event', () => {
    const onClick = jest.fn()
    const user = userEvent.setup();
    render(<FabIcon onClick={onClick}/>)
    
    expect(onClick).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
