import { IKoiMetadata } from './cms/page'

export function win(): { innerWidth: number; innerHeight: number } {
    if (isBrowser()) {
        return window
    }
    return {
        innerWidth: 500,
        innerHeight: 500,
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

export function parseKoiMetadata(metadata: IKoiMetadata) {
    return {
        species: (
            metadata.attributes.find((attr) => attr.trait_type === 'Species')
                ?.value ?? 'Koi'
        ).toLocaleUpperCase(),
        colors: metadata.attributes
            .filter((attr) => {
                return (
                    typeof attr.value === 'string' && attr.value.startsWith('#')
                )
            })
            .map((attr) => attr.value),
        patterns: +(
            metadata.attributes.find(
                (attr) => attr.trait_type === 'Pattern Quantity'
            )?.value ?? 0
        ),

        // use the higher resolution api
        image: metadata.image.replace('/v1/', '/'),
    }
}
