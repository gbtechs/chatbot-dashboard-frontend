#!/bin/bash

echo "Updating main branch..."
git pull origin main

# Build Docker image
echo "Building Docker image..."
docker build -t chatbot-dashboard-frontend-app .

# Stop and remove existing Docker container (if exists)
echo "Stopping and removing existing Docker container..."
docker stop chatbot-dashboard-frontend-app-container || true  # Ignore error if container does not exist
docker rm chatbot-dashboard-frontend-app-container || true    # Ignore error if container does not exist

# Run Docker container with updated image
echo "Running Docker container..."
docker run -d -p 3000:3000 --env-file .env.production --name chatbot-dashboard-frontend-app-container chatbot-dashboard-frontend-app

echo "Deployment completed successfully."