# #!/bin/sh
# echo "PORT=$PORT"
# git fetch origin && git reset --hard origin/main && git clean -f -d
# GATEWAY_PORT=$PORT docker-compose -f docker-compose-prod.yml up --build -d


#!/bin/sh
# fetch-and-deploy.sh
docker compose -f docker-compose.prod.yml down && \
    docker compose -f docker-compose.prod.yml pull && \
    GATEWAY_PORT=7001 docker compose -f docker-compose.prod.yml up -d;
