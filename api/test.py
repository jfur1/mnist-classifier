import requests

# Define API URL
url = "http://localhost:8000/predict/"

# Path to the test image
image_path = "../data/sample.png"

# Open and send the image to the API
with open(image_path, "rb") as file:
    response = requests.post(url, files={"file": file})

# Print the response
print(response.json())  # Expected output: {"prediction": <digit>}