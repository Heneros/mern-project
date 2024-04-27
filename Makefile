build:
	docker compose -f docker-compose.yaml up --build  --remove-orphans 

up:
	docker compose -f docker-compose.yaml up --remove-orphans 

down:
	docker compose -f docker-compose.yaml down

show-logs-backend:
	docker compose -f docker-compose.yaml logs backend

show-logs-frontend:
	docker compose -f docker-compose.yaml logs frontend
	