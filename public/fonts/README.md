# AZONIX Font Installation

The AZONIX font needs to be downloaded and placed in the `/public/fonts/` directory.

## Download Instructions

1. Download AZONIX font from: https://www.dafont.com/azonix.font
2. Extract the `.otf` or `.ttf` file
3. Place it in: `public/fonts/Azonix.otf`

## Alternative: Use Google Fonts Fallback

If AZONIX is not available, we're using a similar bold, geometric font as fallback.

The font is already configured in `globals.css`:

```css
@font-face {
  font-family: 'Azonix';
  src: url('/fonts/Azonix.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## Usage

The logo uses the `.logo-text` class which applies the AZONIX font:

```tsx
<span className="logo-text text-3xl">MSA</span>
```

## Temporary Fallback

Until the font is installed, the system will use the default sans-serif font stack.
