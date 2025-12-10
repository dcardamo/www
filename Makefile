.PHONY: clean dev build

# Remove build artifacts and dependencies
clean:
	rm -rf dist
	rm -rf node_modules
	rm -rf .astro

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build
