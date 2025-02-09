# ⚡️ Stage 1: Build Dependencies (Temporary)
FROM python:3.10-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Install only the required packages
COPY api/requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ⚡️ Stage 2: Final Lightweight Image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy installed dependencies from builder stage
COPY --from=builder /install /usr/local

# Copy the actual API code & model
COPY model /app/model/
COPY api /app/api/

# Set working directory to /app/api (where `app.py` is located)
WORKDIR /app/api

# Expose port 8000 for FastAPI
EXPOSE 8000

# Command to run the FastAPI app
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
