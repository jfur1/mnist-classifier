from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
import torchvision.transforms as transforms
import io
import sys
import os

# Ensure Python can find 'model' directory
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import CNN from model/
from model.model import CNN

# Initialize FastAPI app
app = FastAPI()

# Load trained model
model_path = "../model/mnist_cnn_full.pth"
model = torch.load(model_path, map_location=torch.device("cpu"), weights_only=False)
model.eval()

# Define image preprocessing
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=1),  # Ensure grayscale
    transforms.Resize((28, 28)),  # Resize to MNIST dimensions
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))  # Normalize like MNIST dataset
])

# Define a root endpoint
@app.get("/")
async def root():
    return {"message": "Hello, World!"}


# Define a ping endpoint
@app.get("/ping/")
async def ping():
    return {"message": "pong"}


@app.post("/predict/")
async def predict_digit(file: UploadFile = File(...)):
    try:
        # Read image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # Preprocess image
        image = transform(image).unsqueeze(0)  # Add batch dimension

        # Run inference
        with torch.no_grad():
            output = model(image)
            _, predicted = torch.max(output, 1)
            prediction = predicted.item()

        return {"prediction": prediction}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
