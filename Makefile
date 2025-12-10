.PHONY: clean dev build install deploy

# Install dependencies and disable telemetry
install:
	npm install
	npx astro telemetry disable

# Remove build artifacts and dependencies
clean:
	rm -rf dist node_modules .astro

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Pull latest changes, clean, and build
update:
	git pull
	$(MAKE) clean
	$(MAKE) install
	npm run build
