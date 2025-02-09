# MNIST Digit Classifier - API

This is the backend API for the MNIST digit classifier, built with **FastAPI** and deployed using **Docker**. The API accepts an image of a handwritten digit and returns the predicted classification.

## 🚀 Features
- **FastAPI-based Backend**: Lightweight and efficient.
- **Dockerized Deployment**: Ensures consistency across environments.
- **DigitalOcean Deployment**: Runs on a VPS for accessibility.

## 📂 Project Structure
```
mnist-classifier/
├── api/               # FastAPI application
│   ├── app.py         # Main API logic
│   ├── Dockerfile     # Docker build file
│   ├── requirements.txt  # Dependencies (from root)
├── model/             # Model weights directory
│   ├── mnist_cnn_full.pth
├── requirements.txt   # Dependencies for both API and Notebook
```

## 🛠️ Running Locally with Docker
### **1️⃣ Build the Docker Image**
Run this from the **root** of the project (`mnist-classifier/`):
```bash
cd mnist-classifier

# Build the Docker image
docker build -t mnist-api -f api/Dockerfile .
```

### **2️⃣ Run the Docker Container**
```bash
# Run the API on port 8000
docker run -p 8000:8000 mnist-api
```

### **3️⃣ Test the API**
```bash
curl -X 'POST' 'http://localhost:8000/predict/' \
     -H 'Content-Type: multipart/form-data' \
     -F 'file=@sample.png'
```

---

## 🚀 Deploying to DigitalOcean
### **1️⃣ SCP the Project to the Droplet**
Run the following command to copy your project to your DigitalOcean Droplet:
```bash
scp -r mnist-classifier root@YOUR_DROPLET_IP:~/
```

### **2️⃣ SSH Into the Droplet**
```bash
ssh root@YOUR_DROPLET_IP
```

### **3️⃣ Install Docker on the Droplet**
```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

### **4️⃣ Build and Run the API on the Droplet**
```bash
cd ~/mnist-classifier

docker build -t mnist-api -f api/Dockerfile .
docker run -d -p 8000:8000 mnist-api
```

### **5️⃣ Open Firewall for FastAPI**
```bash
sudo ufw allow 8000
```

### **6️⃣ Test the Live API**
```bash
curl -X 'POST' 'http://YOUR_DROPLET_IP:8000/predict/' \
     -H 'Content-Type: multipart/form-data' \
     -F 'file=@sample.png'
```

✅ If this returns a prediction, your API is now live! 🎉

---

## 🔗 Updating the Frontend
Modify **DigitCanvas.tsx** in the frontend to point to the live API:
```tsx
const API_URL = "http://YOUR_DROPLET_IP:8000";
```

---

## 🔧 Updating the API
1. **Make changes to the API locally.**
2. **Rebuild and redeploy:**
   ```bash
   git add .
   git commit -m "Update API"
   git push origin main
   scp -r mnist-classifier root@YOUR_DROPLET_IP:~/
   ssh root@YOUR_DROPLET_IP
   cd ~/mnist-classifier
   docker build -t mnist-api -f api/Dockerfile .
   docker run -d -p 8000:8000 mnist-api
   ```
3. **Test the updated API.**

---

Your API is now deployed and can receive requests! 🚀

