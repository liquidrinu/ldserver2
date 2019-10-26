# ldserver2

---

### Table of contents:

- [Dependencies](#dependencies)
- [Quickstart](#quickstart)
- [Daemonize Server](#daemonize-server)

---

## Dependencies

#### required:

- npm + nodejs runtime

#### optional:

- openssl
- tree
- pm2
- sqlite3

#### nodejs dependencies:

- `Express` webserver framework for node.js
- `Helmet` secure http headers
- `Bodyparser` parse incoming data and make it available under `req.body` property
- `ip` IP address utilities for node.js
- `Mongoose` ORM driver
- `Passport*` Authentication modules
- `Express-session` carry session throughout client connection

---

## Quickstart

#### systems packages

- clone repo
- change '.env-example' into '.env'
- update .env file and replace all values with own 'complex' strings

#### you can use this to generate keys

```bash
cd ./api/utils
node genKey.js
```

#### init (do these from root directory of repo)
```bash
npm run certs
npm install --save
node initDB.js
```

#### start server
```bash
node server.js
```

visit http(s)://[localhost]:[port]/

---

##### dont change 'primary.sqlite3.db'
##### check out database through GUI with this software https://github.com/sqlitebrowser/sqlitebrowser

---

## Daemonize Server

##### This command installs pm2, a process manager to let processes or servers run in the background

```bash
npm install pm2 -g
```

..then inside baseServer's root directory

```bash
pm2 start server.js --name 'helloWorld'
```

#### Commands:

- `pm2 ls` Shows running processes
- `pm2 monit` Monitor processes
- `pm2 delete [id|name]` kill the daemon _ie. pm2 delete 0 or pm2 delete helloWorld_
- `pm2 --help` for all commandline options
- `pm2 start server.js --watch` Restarts server on source changes (development)
- `pm2 stop [id|name] --watch` Stops restarting on source changes
- `cat ./bin/pm2-status.sh` Quick guide

---

## DOCS

`git pull`
This will update local repo to latest version

#### Scripts:

- `create-certs.sh`
  This script creates and places cert + key into your application
  this requires **openssl**

- `tree.sh`
  A script to show the output as a visual formatted tree on server startups

- `pm2-status.sh`
  A script, but really a documentation to daemonize the webserver

- `ip.js` & `local_ip.sh`
  A script to retrieve and set localip automatically

- `log.js` & `tree.sh`
  A script to give fancy info when starting up the server
