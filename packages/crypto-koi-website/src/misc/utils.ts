export function win(): { innerWidth: number } {
  if (isBrowser()) {
    return window
  }
  return {
    innerWidth: 500,
  }
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}
