from fastapi import FastAPI, File, UploadFile
from PIL import Image, ImageOps  # Import ImageOps for inversion
import torch
import torchvision.transforms as transforms
import io
import sys
import os
from fastapi.middleware.cors import CORSMiddleware

# Get absolute path to the project root
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Add 'model/' to Python's module path
sys.path.append(os.path.join(project_root, "model"))

# Import CNN after ensuring sys.path is set
from model import CNN

# Initialize FastAPI app
app = FastAPI()

# Ensure absolute model path for production
model_path = os.path.join(project_root, "model", "mnist_cnn_full.pth")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the full model
model = torch.load(model_path, map_location=torch.device("cpu"), weights_only=False)

# Move model to CPU and set to eval mode
model.to(torch.device("cpu"))
model.eval()

# Define image preprocessing
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=1),  # Ensure grayscale
    transforms.Resize((28, 28)),  # Resize to MNIST dimensions
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))  # Normalize like MNIST dataset
])

@app.get("/")
async def root():
    return {"message": "Welcome to the MNIST API!"}


@app.get("/ping")
async def ping():
    return {"ping": "pong"}


@app.post("/predict/")
async def predict_digit(file: UploadFile = File(...)):
    try:
        # Read image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # Fix transparency: Convert transparent pixels to white
        if image.mode in ("RGBA", "P"):  # If image has transparency
            new_image = Image.new("RGBA", image.size, (255, 255, 255, 255))  # White background
            new_image.paste(image, (0, 0), image if image.mode == "RGBA" else None)
            image = new_image.convert("RGB")  # Convert to RGB

        # Convert image to grayscale
        image = image.convert("L")  # Convert to grayscale

        # Invert colors (black ↔ white)
        image = ImageOps.invert(image)

        # Save debug image after inversion
        # image.save("../data/debug-inverted.png")

        # Preprocess image for model
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
