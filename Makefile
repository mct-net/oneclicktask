IMAGE_NAME ?= oneclicktask
IMAGE_TAG  ?= latest

.DEFAULT_GOAL := help

.PHONY: help build up up-prod down logs shell

help: ## Show available make targets
	@printf "Available targets:\n"
	@awk 'BEGIN {FS = ":.*## "} /^[a-zA-Z0-9_-]+:.*## / {printf "  %-10s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the production Docker image
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

up: ## Start local development with hot reload
	docker compose up

up-prod: ## Start production containers without override
	docker compose -f docker-compose.yml up -d

down: ## Stop and remove containers
	docker compose down

logs: ## Tail container logs
	docker compose logs -f

shell: ## Open a shell in the running app container
	docker compose exec app bash
