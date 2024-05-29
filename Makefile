# Variables
DOCKER_REGISTRY=leduytien0801
WEB_IMAGE=$(DOCKER_REGISTRY)/bnk-hanover-web
VERSION=latest

# Build Docker images for web
build-and-push-web:
	@echo "Building web Docker image: $(WEB_IMAGE):$(VERSION)..."
	docker buildx b --platform linux/amd64,linux/arm64 -t $(WEB_IMAGE):$(VERSION) . --push
	@echo "Web Docker image build and push successfully: $(WEB_IMAGE):$(VERSION)"


