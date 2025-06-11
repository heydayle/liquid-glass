export interface LiquidGlassTheme {
    glowSize: string
    backgroundHue: number
    colors: {
        appleBlue: string
        applePurple: string
        applePink: string
        appleOrange: string
        surfacePrimary: string
        surfaceSecondary: string
        textPrimary: string
        textSecondary: string
        borderPrimary: string
        borderHover: string
    }
}

export interface MousePosition {
    x: number
    y: number
    active: boolean
}

export interface LiquidGlassVariant {
    opacity: number
    blur: number
    borderRadius: number
}