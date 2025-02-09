# Use an official lightweight Python image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY api/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r ./requirements.txt

# Copy model & API separately to maintain directory structure
COPY model /app/model/
COPY api /app/api/

# Set working directory to /app/api (where `app.py` is located)
WORKDIR /app/api

# Expose port 8000 for FastAPI
EXPOSE 8000

# Command to run the FastAPI app
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
