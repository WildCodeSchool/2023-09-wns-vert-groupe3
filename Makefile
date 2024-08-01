run-dev:
	docker compose build
	docker compose watch

logs-dev:
	docker compose logs -f

run-prod:
	docker compose -f docker-compose.prod.yml up --build -d

logs-prod:
	docker compose -f docker-compose.prod.yml logs -f

backend-test-watch:
	docker compose exec backend npm run test:watch

web-app-test-watch:
	docker compose exec frontend npm run test:watch

database-generate-migration:
	docker compose exec backend npm run migration:generate
	docker compose cp backend:/app/src/database/migrations/ backend/src/database
