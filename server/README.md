## NodeJS version 19.8.1

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

# How to install BackEnd in EC2 instance

## 1. Create EC2 instance with Security Group accept inbounce TCP/IP protocol with port 27017

## 2. Install docker and docker-compose

Ref: https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/

## 3. Install git

```
sudo yum install git -y
```

## 4. Install nodejs

```
sudo yum install nodejs
```

## 5. Install BackEnd container

- Clone project: https://github.com/trungpd1102/QuanLy_TiemChung.git

- Needs to enter username and password(or token)

- Access folder

````
cd /server
```

- Build container
````

docker-compose up -d

```

```
