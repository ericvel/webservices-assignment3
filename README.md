# webservices-assignment3

## User service
```
cd user
```
**Build image**
```
docker build -t <your username>/user-service .
```

**Run container from image**
```
docker run --name user-service -p 2000:2000 -d <your username>/user-service
```

## URl shortener
```
cd url-shortener
```
**Build image**
```
docker build -t <your username>/url-shortener .
```

**Run container from image**
```
docker run --name url-shortener -p 4000:4000 -d <your username>/url-shortener
```

## Test containers
```
docker ps
```
You should see both containers running.