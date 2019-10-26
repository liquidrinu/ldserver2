#!/bin/bash
#
# generate own certs 

#cd '..' &&

if [ ! -d "./certificates" ]; then
    mkdir './certificates';
fi

cd './certificates' &&

if [ ! -d "./openssl" ]; then
    mkdir './openssl';
fi

cd './openssl' &&
openssl genrsa -out client-key.pem 4096 &&
openssl req -new -key client-key.pem -out client.csr &&
openssl x509 -req -in client.csr -signkey client-key.pem -out client-cert.pem &&


##openssl genrsa -out client-key.pem 2048 &&
##openssl req -new -key client-key.pem -out client.csr &&
##openssl x509 -req -in client.csr -signkey client-key.pem -out client-cert.pem &&

#openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out MyCertificate.crt -keyout MyKey.key

exit 0
