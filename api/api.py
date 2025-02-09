from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
import torchvision.transforms as transforms
import io

# Initialize FastAPI app
app = FastAPI()

# Load trained model
import os 
print(os.getcwd())
model_path = "../model/mnist_cnn_full.pth"

# Load trained model (ensure weights_only=False)
model = torch.load(model_path, map_location=torch.device("cpu"), weights_only=False)
model.eval()  # Set to evaluation mode

# Define image preprocessing (convert to tensor)
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=1),  # Ensure grayscale
    transforms.Resize((28, 28)),  # Resize to MNIST dimensions
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))  # MNIST normalization
])

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
