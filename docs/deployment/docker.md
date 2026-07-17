# Docker Deployment
## Start Platform

From project root:

```bash
docker compose up

#| Service          | Port |
#| ---------------- | ---- |
#| Payment Exporter | 9400 |
#| Prometheus       | 9090 |
#| Grafana          | 3000 |


#Stop Platform
docker compose down

#View Logs
#Exporter:
docker compose logs payment-exporter

#Prometheus:
docker compose logs prometheus

#Grafana:
docker compose logs grafana

#Architecture
#The exporter container connects to the existing MySQL instance using:

host.docker.internal

#This allows Docker containers to communicate with services running on the Windows host.


# Step 6: Test the improved setup
Stop your current stack:

#Press:
#```text
CTRL + C

#Then:
docker compose down

#Start again:
docker compose up

#Expected:
payment-exporter | Connected to MySQL
payment-exporter | Payment exporter running on port 9400
prometheus | Server is ready to receive web requests
grafana | HTTP Server Listen