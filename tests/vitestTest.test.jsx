import { render, screen, cleanup } from "@testing-library/react"
import { afterEach, describe, it } from "vitest"
import { SelectChargingMode } from "../src/components/SelectChargingMode"
import { StepForm } from '../src/context/dataStudent'

describe('SelectChargingMode', () => {
  afterEach(cleanup)
  
  it('should render', () => {
    render(
      <StepForm>
        <SelectChargingMode />
      </StepForm>
      )
  })

  it('should render title correctly', () => {
    render(
      <StepForm>
        <SelectChargingMode />
      </StepForm>
    )

    screen.getByText('Elija la forma de cargar su datos:')
  })
})