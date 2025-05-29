IMAGE_NAME = avito-frontend

CONTAINER_NAME = avito-frontend-container

build:
	docker build -t $(IMAGE_NAME) .

start:
	docker run -d --name $(CONTAINER_NAME) -p 3000:80 $(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
