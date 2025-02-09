# MNIST Digit Classifier - Frontend

This is the frontend for the MNIST digit classifier, built with **React, Vite, and TypeScript**. The application provides a **28x28 drawing canvas** where users can draw a digit, submit it for classification, and receive the predicted number from the backend API.

## 🚀 Features
- **Digit Drawing Canvas**: Users can draw a digit on a 280x280 canvas, which is scaled down to 28x28.
- **Real-Time Classification**: The drawn digit is sent as a PNG to the FastAPI backend for classification.
- **GitHub Pages Deployment**: Hosted for free using GitHub Pages.

## 📂 Project Structure
```
frontend/
│── src/
│   ├── components/  # Reusable UI components (DigitCanvas.tsx)
│   ├── App.tsx      # Main application logic
│   ├── main.tsx     # React entry point
│── public/          # Static assets
│── package.json     # Dependencies and scripts
│── vite.config.ts   # Vite configuration (base URL for GitHub Pages)
```

## 🛠️ Installation
```bash
git clone https://github.com/jfur1/mnist-classifier.git
cd mnist-classifier
npm install
npm run dev  # Start local development
```

## 📦 Building for Production
```bash
npm run build  # Generates optimized production build
```

## 🌍 Deploying to GitHub Pages
### **Manual Deployment**
1. **Ensure `vite.config.ts` has the correct `base` URL:**
   ```ts
   export default defineConfig({
     base: "/mnist-classifier/",  // Replace with actual repo name
   });
   ```
2. **Build and deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

## 🔗 Accessing the Deployed App
Once deployed, the app will be available at:
```
https://jfur1.github.io/mnist-classifier/
```

## 🔧 Updating the App
1. **Make changes to the frontend**.
2. **Manually Run**:
   ```bash
   npm run build
   npm run deploy
   ```

---
