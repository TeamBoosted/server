if [ "$1" == "nocontainer" ]; then
  echo "Starting new container.."
else
  echo "Restarting container.."
  docker stop teamboosted-server && docker rm teamboosted-server
fi
docker build -t teamboosted-server . && docker run --name teamboosted-server -p 80:80 --network br0 --env-file .env -d teamboosted-server