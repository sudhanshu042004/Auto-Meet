# gmeet-bot


## Build:

```
docker build -t gmeet -f Dockerfile .
```

## Usage:

```
docker run -it \
    -e GMEET_LINK=https://meet.google.com/my-gmeet-id \
    -e GMAIL_USER_EMAIL=myuser1234@gmail.com \
    -e GMAIL_USER_PASSWORD=my_gmail_password \
    -e DURATION_IN_MINUTES=1 \ #duration of the meeting to record
    -e MAX_WAIT_TIME_IN_MINUTES=2 \ #max wait time in the lobby
    -v $PWD/recordings:/app/recordings \ # local storage for the recording
    -v $PWD/screenshots:/app/screenshots \ # local storage for intermediate bot screenshots
    gmeet
```
