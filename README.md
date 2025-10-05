# Sourav Halder - Portfolio Website

A modern, professional portfolio website showcasing my work as a Data Scientist and Cloud Engineer.

## 📁 Project Structure

```
portfolio/
│
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # All styles
│   ├── js/
│   │   └── main.js        # JavaScript functionality
│   └── images/
│       └── avatar.png     # Profile photo (add your image here)
│
└── README.md              # Project documentation
```

## 🚀 Features

- **Modern Design**: Clean, professional UI with gradient accents
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Fully Responsive**: Works on all devices and screen sizes
- **Interactive Navigation**: Smooth scrolling with active link tracking
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Fast loading with optimized assets

## 🛠️ Technologies Used

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)

## 📝 Setup Instructions

1. **Download/Clone the repository**

2. **Add your photo**:
   - Place your profile photo in `assets/images/` folder
   - Name it `avatar.png` (or update the path in `index.html`)
   - Recommended size: 500x500px minimum

3. **Customize content**:
   - Edit `index.html` to update your personal information
   - Modify sections: About, Experience, Skills, Contact

4. **Test locally**:
   - Open `index.html` in your browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```

5. **Deploy**:
   - Upload to any web hosting service
   - GitHub Pages, Netlify, Vercel are free options

## 🎨 Customization

### Colors
Edit CSS custom properties in `assets/css/style.css`:
```css
:root {
    --primary: #3b82f6;
    --secondary: #8b5cf6;
    --accent: #06b6d4;
    /* ... */
}
```

### Content
Update sections in `index.html`:
- Hero section: Name, title, description
- About section: Services/expertise
- Experience: Timeline items
- Skills: Add/remove skills
- Contact: Email, phone, location

### Form Integration
Replace the form submission logic in `assets/js/main.js` with:
- [EmailJS](https://www.emailjs.com/)
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- Your own backend API

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Sourav Halder**
- Email: halder.sourav1996@gmail.com
- LinkedIn: [sourav--halder](https://www.linkedin.com/in/sourav--halder)

---

Made with ❤️ by Sourav Halder