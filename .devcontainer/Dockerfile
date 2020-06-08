FROM node:alpine

ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG USERNAME=node

RUN apk add --no-cache fish git

RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
  groupmod --gid $USER_GID $USERNAME \
  && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
  && chown -R $USER_UID:$USER_GID /home/$USERNAME; \
fi
