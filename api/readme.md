# MNIST Inference API (FastAPI)

## Overview
This FastAPI service provides an **inference API** for our trained **MNIST digit classifier**.  
Users can **send an image** (28x28 grayscale) to the `/predict/` endpoint, and the API will **return the predicted digit**.

## Installation

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Server
Navigate to the `/api/` directory and run the following command to start the API.
```bash
python3 -m api
```

The API will be available at [localhost:8000](http://localhost:8000).
**API Documentation** will be available at [localhost:8000/docs](http://localhost:8000/docs).


## API Endpoints

### **`POST /predict/`**
- Request: Upload a 28x28 grayscale image.
- Response: Returns the predicted digit.


#### **Example Request Using `curl`**

```bash
curl -X 'POST' 'http://localhost:8000/predict/' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@../data/sample.png'
```

#### **Example Response**
```bash
{"prediction": 7}
```

## Testing the API
After running the server, test it using `test.py`:

```bash
python3 test.py
```