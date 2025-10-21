# Use official Python runtime as base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY packages/backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend application
COPY packages/backend ./packages/backend

# Copy environment configuration (template)
COPY environment.env ./

# Set working directory to backend
WORKDIR /app/packages/backend

# Expose port (Railway will set PORT env variable)
EXPOSE 5000

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=run.py

# Run the Flask application
CMD ["python", "run.py"]

