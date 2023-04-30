AWS_ACCOUNT_ID=804399200597
AWS_ECR_REGION=ap-south-1
AWS_ECR_REPO=microservices
NAME := $(shell cat NAME)
VERSION := $(shell cat VERSION)
PATH_SUFFIX := $(shell echo "")
.PHONY: clean clean-build

clean: clean-build

clean-build:
	rm -rf build/

docker-build:
	docker build --file=./Dockerfile --tag=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_ECR_REGION}.amazonaws.com/${AWS_ECR_REPO}:${NAME}-${VERSION} .

docker-push: docker-build clean
	docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_ECR_REGION}.amazonaws.com/${AWS_ECR_REPO}:${NAME}-${VERSION}