
FROM node:14
WORKDIR /out/app-be
COPY package.json package-lock.json ./ 
RUN npm install
ADD . .
CMD ["npm", "start"]
EXPOSE 8080
