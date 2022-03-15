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

export function getMobileOperatingSystem() {
  var userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'windows'
  }

  if (/android/i.test(userAgent)) {
    return 'android'
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'ios'
  }

  return 'unknown'
}
