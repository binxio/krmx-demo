FROM node
WORKDIR /app

# install dependencies
RUN npm install -g typescript@5 ts-node@10.9

## client
#EXPOSE 3000
#
## slides
#EXPOSE 3030
#
## server
#EXPOSE 8082

# entry
ENTRYPOINT /bin/bash
CMD ["bash", "worker.sh"]
