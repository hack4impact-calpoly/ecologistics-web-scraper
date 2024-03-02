#use make with specific targets 
# Install dependencies and activate virtual environment
post-pull:
	poetry install
	poetry shell

# Lint and format the code
pre-commit:
	poetry run flake8 . api
	poetry run black . api

# Run linting only
lint:
	poetry run flake8 . api

# Format the code using black
format:
	poetry run black . api

# Run the backend locally using chalice
run-dev:
	cd api && poetry run chalice local

# Deploy the backend to AWS using chalice
deploy-to-aws:
	cd api && poetry run chalice deploy

# Undeploy the backend from AWS using chalice
undeploy-from-aws:
	cd api && poetry run chalice delete

test-all:
	python -m unittest discover -s api/tests/example

# Display help with a list of available targets and their descriptions
help:
	@echo "Available targets:"
	@echo "  make post-pull       - Install dependencies and activate virtual environment"
	@echo "  make pre-commit      - Run linting and formatting (pre-commit hook)"
	@echo "  make lint            - Run linting only"
	@echo "  make format          - Format the code using black"
	@echo "  make run-dev         - Run the backend locally using chalice"
	@echo "  make deploy-to-aws   - Deploy the backend to AWS using chalice"
	@echo "  make undeploy-from-aws - Undeploy the backend from AWS using chalice"
	@echo "  make help            - Display this help message"

# Phony targets to prevent conflicts with file names
.PHONY: post-pull pre-commit lint format run-dev deploy-to-aws undeploy-from-aws help
