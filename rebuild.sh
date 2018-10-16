if [ "$1" == "nocontainer" ]; then
  echo "Starting new container.."
else
  echo "Restarting container.."
  docker stop teamboosted-server && docker rm -f teamboosted-server && docker image prune -af && docker system prune -af
fi
docker pull danielkang674/teamboosted-server:latest && docker run --volumes-from teamboosted-client --name teamboosted-server -p 80:80 --network br0 --env-file .env -d danielkang674/teamboosted-server:latest
