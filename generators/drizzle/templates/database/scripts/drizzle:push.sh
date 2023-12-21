#!/bin/sh


if [ ! -f drizzle.config.ts ]; then
  echo "Please run this script from the root of the @<%= projectName %>/db package."
  exit 1
fi


sst=$(sst bind --script 'echo {\
  \"host\": \"$SST_Secret_value_DATABASE_HOST\",\
  \"port\": \"$SST_Secret_value_DATABASE_PORT\",\
  \"password\": \"$SST_Secret_value_DATABASE_PASSWORD\",\
  \"user\": \"$SST_Secret_value_DATABASE_USER\"\
}')

USER=$(echo $sst | jq -r .user)
PASSWORD=$(echo $sst | jq -r .password)
HOST=$(echo $sst | jq -r .host)
PORT=$(echo $sst | jq -r .port)


yarn drizzle-kit push:mysql \
  --schema ./src/schema.ts \
  --host $HOST \
  --port $PORT \
  --user $USER \
  --password $PASSWORD \
  --database chatsum \
  --driver mysql2
