it is not perfect. it is a quick example.

To start quickly you might just use the apt-get or yum 
(or what ever you have in your linux distrubution)
to install nginx:

     apt-get install nginx


if you like to install nginx from source
you can browse to 

http://nginx.org/en/download.html

you'll see list with versions.

click on the version on the left to windows version. and download it.

see here : http://wiki.nginx.org/NginxModules and http://wiki.nginx.org/NginxInstallOptions

you probably must have pcre installed to be able to use regular expresions.

apt-get install openssl-devel pcre-devel zlib-devel

./configure \
  --prefix=/usr \
  --sbin-path=/usr/sbin/nginx \
  --conf-path=/etc/nginx/nginx.conf \
  --error-log-path=/var/log/nginx/error.log \
  --pid-path=/var/run/nginx/nginx.pid  \
  --lock-path=/var/lock/nginx.lock \
  --user=www-data \
  --group=www-data \
  --with-http_ssl_module \
  --with-http_flv_module \
  --with-http_gzip_static_module \
  --http-log-path=/var/log/nginx/access.log \
  --http-client-body-temp-path=/var/tmp/nginx/client/ \
  --http-proxy-temp-path=/var/tmp/nginx/proxy/ \
  --http-fastcgi-temp-path=/var/tmp/nginx/fcgi/ 

make
make install



nginx and mongodb are better when they are compiled from source.

from apt-get you might get an old version and without custom plugins compiled in.


to install php

1st install php5-cli then php5-cgi otherwise it will install php5-cgi dependency - apache's httpd.

apt-get install php5-cli
apt-get install php5-cgi
