import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../src/modules/core/components/Input'

describe('Input Component', () => {
  it('renderiza correctamente con props básicas', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('renderiza con label cuando se proporciona', () => {
    render(<Input label="Nombre" />)
    
    expect(screen.getByText('Nombre')).toBeInTheDocument()
  })

  it('renderiza sin label cuando no se proporciona', () => {
    render(<Input />)
    
    const labels = screen.queryAllByText(/label/i)
    expect(labels).toHaveLength(0)
  })

  it('muestra mensaje de error cuando se proporciona', () => {
    const errorMessage = 'Este campo es requerido'
    render(<Input error={errorMessage} />)
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-500')
  })

  it('aplica estilos de error cuando hay error', () => {
    render(<Input error="Error" />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveClass('border-red-500')
  })

  it('aplica estilos normales cuando no hay error', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveClass('border-primary')
  })

  it('muestra helper text cuando se proporciona y no hay error', () => {
    const helperText = 'Ingresa tu nombre completo'
    render(<Input helperText={helperText} />)
    
    expect(screen.getByText(helperText)).toBeInTheDocument()
    expect(screen.getByText(helperText)).toHaveClass('text-gray-500')
  })

  it('no muestra helper text cuando hay error', () => {
    const helperText = 'Helper text'
    const errorMessage = 'Error message'
    render(<Input helperText={helperText} error={errorMessage} />)
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.queryByText(helperText)).not.toBeInTheDocument()
  })

  it('renderiza icono cuando se proporciona', () => {
    const TestIcon = () => <span data-testid="test-icon">📧</span>
    render(<Input icon={<TestIcon />} />)
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('aplica type correcto al input', () => {
    render(<Input type="email" />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveAttribute('type', 'email')
  })

  it('aplica type text por defecto', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveAttribute('type', 'text')
  })

  it('aplica placeholder cuando se proporciona', () => {
    const placeholder = 'Ingresa tu email'
    render(<Input placeholder={placeholder} />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveAttribute('placeholder', placeholder)
  })

  it('aplica clases personalizadas', () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveClass('custom-class')
  })

  it('maneja eventos de cambio', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'test')
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('acepta una ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('pasa props HTML adicionales al input', () => {
    render(<Input required data-testid="custom-input" />)
    const input = screen.getByTestId('custom-input')
    
    expect(input).toHaveAttribute('required')
  })

  it('se deshabilita cuando disabled es true', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    
    expect(input).toBeDisabled()
  })

  it('aplica las clases de ancho completo', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveClass('w-full')
  })

  it('mantiene el displayName correcto', () => {
    expect(Input.displayName).toBe('Input')
  })
}) 