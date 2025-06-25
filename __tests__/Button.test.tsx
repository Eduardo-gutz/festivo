import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../src/modules/core/components/Button'

describe('Button Component', () => {
  it('renderiza correctamente con texto', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument()
  })

  it('aplica las clases base correctamente', () => {
    render(<Button>Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-4', 'py-2', 'rounded-md', 'font-medium', 'transition-colors', 'duration-200')
  })

  it('aplica la variante primary por defecto', () => {
    render(<Button>Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary', 'hover:bg-primary/80', 'text-white')
  })

  it('aplica la variante secondary correctamente', () => {
    render(<Button variant="secondary">Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary', 'hover:bg-secondary/80', 'text-white')
  })

  it('aplica la variante outline correctamente', () => {
    render(<Button variant="outline">Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border', 'border-gray-300', 'hover:bg-gray-100', 'text-gray-800')
  })

  it('aplica fullWidth cuando se especifica', () => {
    render(<Button fullWidth>Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('w-full')
  })

  it('no aplica fullWidth por defecto', () => {
    render(<Button>Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button).not.toHaveClass('w-full')
  })

  it('aplica clases personalizadas', () => {
    render(<Button className="custom-class">Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('maneja eventos de click', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Test Button</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('se deshabilita cuando disabled es true', () => {
    render(<Button disabled>Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('pasa props HTML adicionales al elemento button', () => {
    render(<Button type="submit" data-testid="custom-button">Test Button</Button>)
    const button = screen.getByTestId('custom-button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('renderiza elementos hijos complejos', () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>
    )
    
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })
})