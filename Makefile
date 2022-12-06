include .env

APP := api_cat_learning_integration
TAG_IMAGE := latest

up:
	docker-compose up -d postgres

down:
	docker-compose down

reset:
	npx prisma migrate reset

db:
	npx prisma studio
