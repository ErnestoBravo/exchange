ARG BASE_REPOSITORY=artifactory.mova.indra.es/docker/
ARG BASE_IMAGENAME=nginx
ARG BASE_TAGVERSION=latest
FROM ${BASE_REPOSITORY}${BASE_IMAGENAME}:${BASE_TAGVERSION}

ENV NGINX_PORT=80

COPY dist/ /usr/share/nginx/html
ADD nginx-templates /etc/nginx/templates
#COPY nginx.conf /etc/nginx/

#Expose service
EXPOSE ${NGINX_PORT}

#Build Args
ARG BRANCH=unknown
ARG VERSION=unknown
ARG BUILDER=unknown
ARG GIT_COMMIT=unknwon
ARG GIT_PAGE=unknwon
ARG COMMENT=unknwon

#Images label
LABEL maintainer="Ports-Silogport Team" \
  vendor1="Indra Transportes" \
  git.BRANCH=$BRANCH \
  git.VERSION=$VERSION \
  git.BUILDER=$BUILDER \
  git.HASH=$GIT_COMMIT \
  git.URL=$GIT_PAGE \
  git.COMMENT=$COMMENT
