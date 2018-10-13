if [ "$1" == "nocontainer" ]; then
  echo "Starting new container.."
else
  echo "Restarting container.."
<<<<<<< HEAD
  docker stop teamboosted-server && docker rm -f -v teamboosted-server && docker image prune -af && docker system prune -af
fi
docker pull danielkang674/teamboosted-server:latest && docker run --volumes-from teamboosted-client --name teamboosted-server -p 80:80 --network br0 --env-file .env -d teamboosted-server
=======
  docker stop teamboosted-server && docker rm -f teamboosted-server && docker image prune -af && docker system prune -af
fi
docker pull danielkang674/teamboosted-server:latest && docker run --volumes-from teamboosted-client --name teamboosted-server -p 80:80 --network br0 --env-file .env -d danielkang674/teamboosted-server:latest
>>>>>>> 741e99ecbd6187eb2aca7a11fbcb3643f5ea5e21
