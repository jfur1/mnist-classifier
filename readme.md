# mnist-classifier

## Overview

This project is a handwritten digit classification system trained on the MNIST dataset using a Convolutional Neural Network (CNN). It includes:

- A Jupyter notebook for model development and documentation.
- A Python API (FastAPI/Flask) for model inference.
- A frontend (React/JS) for users to draw a digit and get real-time classification.

This repository follows a monorepo structure, containing the training pipeline, model API, and frontend in separate directories.

### System Specifications

This project was developed on the following hardware:
- CPU: AMD Ryzen 5 5600X (6 cores, 12 threads)
- GPU: NVIDIA GeForce RTX 3070
- RAM: 32GB
- CUDA Version: 12.6
- Python Version: 3.9+

### Directory Structure

```bash
mnist-classifier/
│── data/                      # Dataset (ignored in Git)
│── notebooks/                 # Jupyter notebooks with markdown explanations
│── model/                     # Model architecture, training script, saved models
│── api/                       # FastAPI or Flask for serving inference
│── frontend/                  # React/JS frontend for drawing digits
│── scripts/                   # Utility scripts for dataset processing
│── tests/                     # Unit tests (optional, best practice)
│── requirements.txt           # Python dependencies
│── README.md                  # Project description
│── .gitignore                 # Ignore unnecessary files
```

### Data Source and Format

The dataset used in this project is the **MNIST (Modified National Institute of Standards and Technology) dataset**, which contains **handwritten digits (0-9) in grayscale (28x28 pixels)**.

- The dataset is downloaded from **torchvision.datasets.MNIST**, a PyTorch utility that handles dataset retrieval.
- It is stored in a **binary IDX format**, rather than individual image files (e.g., PNG or JPG).
- The raw dataset is located in `data/MNIST/raw/` and consists of the following files:
    - `train-images-idx3-ubyte` → Training images
    - `train-labels-idx1-ubyte` → Training labels (digits 0-9)
    - `t10k-images-idx3-ubyte` → Test images
    - `t10k-labels-idx1-ubyte` → Test labels

To avoid unnecessary re-downloading, the script checks if these files already exist before downloading them.

### Installation Guide

#### 1. Clone the Repository
```bash
git clone https://github.com/jfur1/mnist-classifier.git
cd mnist-classifier
```

#### 2. Set Up a Virtual Environment
```python
python -m venv venv
```

Activate the environment:
- Windows:

    ```bash
    venv\Scripts\activate
    ```

- Mac/Linux

    ```bash
    source venv/bin/activate
    ```

#### 3. Install dependencies
```python
pip install --upgrade pip
pip install -r requirements.txt
```

#### 4. Verify PyTorch Installation
```python
import torch
print(torch.cuda.is_available())  # Should return True
print(torch.cuda.get_device_name(0))  # Should print RTX 3070 (your GPU)
```

## Model Architecture
The classifier uses a Convolutional Neural Network (CNN), which is well-suited for image recognition tasks. The model consists of:
- Convolutional Layers for feature extraction
- Max Pooling for downsampling
- Fully Connected Layers for classification
- Softmax Activation for predicting digit classes (0-9)

## Next Steps
- Train the CNN model on MNIST.
- Evaluate model accuracy and visualize results.
- Deploy an inference API using FastAPI or Flask.
- Develop a frontend where users can draw digits and get real-time classification.

---

This README will be updated as the project progresses. Additional documentation will be added to each subdirectory for more detailed information