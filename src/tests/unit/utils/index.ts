export * from './modal'

export const testIdSelector = (id: string) => `[data-testId="${id}"]`
export const selectorWithTestId = (selector: string, id: string) => `${selector}${testIdSelector(id)}`
