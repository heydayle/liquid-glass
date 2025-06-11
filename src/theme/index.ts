type LiquidGlassTheme = {
    glowSize: string;
    backgroundHue: number;
    colors: {
        appleBlue: string;
        applePurple: string;
        applePink: string;
        appleOrange: string;
        surfacePrimary: string;
        surfaceSecondary: string;
        textPrimary: string;
        textSecondary: string;
        borderPrimary: string;
        borderHover: string;
    };
};

export const liquidGlassTheme: LiquidGlassTheme = {
    glowSize: '400px',
    backgroundHue: 220,
    colors: {
        appleBlue: '#007AFF',
        applePurple: '#AF52DE',
        applePink: '#FF2D92',
        appleOrange: '#FF9500',
        surfacePrimary: 'rgba(255, 255, 255, 0.08)',
        surfaceSecondary: 'rgba(255, 255, 255, 0.12)',
        textPrimary: 'rgba(255, 255, 255, 0.98)',
        textSecondary: 'rgba(255, 255, 255, 0.75)',
        borderPrimary: 'rgba(255, 255, 255, 0.15)',
        borderHover: 'rgba(255, 255, 255, 0.25)'
    }
}