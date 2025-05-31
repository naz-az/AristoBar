# Aristo - Sophisticated Urban Bar Website

A stunning, interactive static website for Aristo, a trendy urban bar. Built with React, styled-components, and Framer Motion for smooth animations and modern UX/UI design.

## 🌟 Features

### Pages
- **Home**: Eye-catching hero section with call-to-action buttons and feature highlights
- **Menu**: Tabbed layout displaying cocktails, wines, beers, and non-alcoholic options
- **About**: Bar's story, team information, and operating hours
- **Events**: Calendar-style layout for upcoming events and live music nights
- **Gallery**: Responsive photo gallery with lightbox functionality
- **Contact**: Contact form, map embed, and social media links

### Key Features
- ✨ **Modern Design**: Sophisticated dark brown color scheme with elegant typography
- 🌙 **Dark Mode Toggle**: Seamless theme switching
- 📱 **Fully Responsive**: Optimized for all screen sizes
- 🎭 **Smooth Animations**: Powered by Framer Motion
- 🧭 **Sticky Navigation**: Animated navbar with scroll effects
- 🎨 **Styled Components**: Clean, modular CSS-in-JS styling
- ⚡ **Performance Optimized**: Fast loading and smooth interactions
- 🔍 **SEO Friendly**: Semantic HTML and proper meta tags

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animation library
- **Google Fonts** - Inter & Playfair Display typography

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aristo-bar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
aristo-bar/
├── public/
│   ├── index.html          # HTML template with SEO meta tags
│   └── ...
├── src/
│   ├── components/
│   │   └── Navbar.js       # Navigation component
│   ├── pages/
│   │   ├── Home.js         # Home page with hero section
│   │   ├── Menu.js         # Menu with tabbed layout
│   │   ├── About.js        # About page with story & team
│   │   ├── Events.js       # Events calendar
│   │   ├── Gallery.js      # Photo gallery with lightbox
│   │   └── Contact.js      # Contact form & info
│   ├── App.js              # Main app with routing & theme
│   └── index.js            # Entry point
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: `#5D1E0F`
- **Accent**: `#8B2F1F`
- **Dark Text**: `#2c1810`
- **Light Background**: `#ffffff`
- **Surface**: `#f8f8f8`

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Scroll-based animations
- Loading animations

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🌙 Dark Mode

Toggle between light and dark themes using the switch in the navigation bar. Theme preference is managed through React Context.

## 📧 Contact Form

The contact form includes:
- Form validation
- Loading states
- Success messages
- Responsive design

*Note: Form submission is currently simulated. Integrate with a backend service for production use.*

## 🎭 Animations

Powered by Framer Motion:
- Page transitions
- Scroll-triggered animations
- Hover effects
- Loading animations
- Stagger animations for lists

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `App.js`
3. Update navigation in `Navbar.js`

### Modifying Themes
Update theme objects in `App.js`:
```javascript
const lightTheme = {
  primary: '#5D1E0F',
  // ... other colors
};
```

### Adding Animations
Use Framer Motion components:
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Vercel
1. Connect your repository to Vercel
2. Vercel will automatically build and deploy

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/aristo-bar",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please contact:
- Email: info@aristobar.com
- Website: [aristobar.com](https://aristobar.com)

---

**Aristo** - Where Sophistication Meets Urban Energy ✨
