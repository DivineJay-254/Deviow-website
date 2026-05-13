# DEVIOW Website - Clean URL Deployment Guide

## Project Structure

The website has been converted to use clean URLs with folder-based routing:

```
/
├── index.html                 # Homepage
├── /about/index.html         # → /about
├── /programs/index.html      # → /programs
├── /impact/index.html        # → /impact
├── /contact/index.html       # → /contact
├── /values/index.html        # → /values
├── /gallery/index.html       # → /gallery
├── /play-and-grow/index.html # → /play-and-grow
├── styles.css                # Global stylesheet
├── script.js                 # JavaScript functionality
├── /images/                  # Image assets
├── .htaccess                 # Apache server config
├── _redirects                # Netlify redirects
├── netlify.toml              # Netlify configuration
├── vercel.json               # Vercel configuration
└── package.json              # Project metadata
```

## Deployment Instructions

### Vercel (Recommended)

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Vercel automatically detects `vercel.json` and configures clean URLs
5. Click "Deploy"

**The `vercel.json` file handles all clean URL routing automatically.**

### Netlify

1. Push your repository to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git" and select your repository
4. Set Build command to: (leave empty - static site)
5. Set Publish directory to: `.` (current directory)
6. Click "Deploy site"

**The `_redirects` and `netlify.toml` files handle clean URL routing.**

### GitHub Pages

1. In your repository settings, enable GitHub Pages
2. Select "Deploy from a branch" and choose the branch
3. GitHub Pages will automatically serve clean URLs with `index.html` files

### Standard Hosting (Apache)

1. Upload all files to your web server
2. The `.htaccess` file automatically enables clean URL routing
3. Ensure `mod_rewrite` is enabled on your Apache server

### Standard Hosting (Nginx)

Add this to your nginx configuration:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Key Features

- ✓ All pages accessible via clean URLs (no `.html` extensions)
- ✓ Absolute paths for CSS, JavaScript, and images
- ✓ Relative paths work for images in nested pages
- ✓ Hover effects on all cards
- ✓ Animated statistics counter
- ✓ Image slide-in animations
- ✓ Responsive design on all devices
- ✓ Full accessibility support

## Navigation Structure

All pages use clean URLs without `.html` extensions:

- `/` - Homepage
- `/about` - About Us page
- `/programs` - Programs page
- `/impact` - Impact page
- `/contact` - Contact page
- `/values` - Values page
- `/gallery` - Gallery page
- `/play-and-grow` - Play & Grow page

## Asset Paths

- **Homepage**: Uses absolute paths (`/styles.css`, `/images/`, `/script.js`)
- **Nested pages**: Use relative paths (`../styles.css`, `../images/`, `../script.js`)

This ensures compatibility with both folder-based routing and standard hosting.

## Testing Locally

To test clean URLs locally:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

Then visit: `http://localhost:8000`

Navigate to:
- `http://localhost:8000/` - Homepage
- `http://localhost:8000/about` - About page
- `http://localhost:8000/programs` - Programs page
- etc.

## Troubleshooting

**Issue**: Pages show 404 after deploying
- **Solution**: Ensure your hosting platform's clean URL configuration is enabled (check `.htaccess`, `_redirects`, `netlify.toml`, or `vercel.json`)

**Issue**: CSS/Images not loading on nested pages
- **Solution**: The nested pages use relative paths (`../`). Ensure all folders contain their `index.html` files.

**Issue**: Mobile menu not working
- **Solution**: Verify `/script.js` is loading correctly in browser DevTools

## Browser Compatibility

The website works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Production Checklist

- ✓ Old `.html` files removed
- ✓ All navigation links use clean URLs
- ✓ CSS and JavaScript paths are absolute on homepage
- ✓ Image assets are in `/images` folder
- ✓ Hosting configuration files created (`.htaccess`, `_redirects`, `netlify.toml`, `vercel.json`)
- ✓ All 8 pages accessible via clean URLs
- ✓ Responsive design tested
- ✓ Analytics ready for integration

## Support

For deployment issues or questions, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Documentation](https://pages.github.com)
