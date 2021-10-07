ARG VARIANT=${VARIANT:-"16-bullseye"}
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

ARG USERNAME=${USERNAME:-"node"}
ARG USER_UID=${USER_UID:-"1000"}
ARG USER_GID=${USER_UID}

ARG WORKING_DIR=/workspaces/{repository-name}

ARG INSTALL_ZSH="true"
ARG ENABLE_NONROOT_DOCKER="true"
# * Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="false"
# * Use the OSS Moby CLI instead of the licensed Docker CLI
ARG USE_MOBY="true"

ARG COMMON_DEBIAN_URL=https://raw.githubusercontent.com/microsoft/vscode-dev-containers/master/script-library/common-debian.sh
ARG DOCKER_DEBIAN_URL=https://raw.githubusercontent.com/microsoft/vscode-dev-containers/master/script-library/docker-debian.sh

# * Add sudo support
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  sudo \
  && echo ${USERNAME} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USERNAME} \
  && chmod 0440 /etc/sudoers.d/${USERNAME} \
  && curl ${COMMON_DEBIAN_URL} -sSf | bash -s "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true" \
  # * Use Docker script from script library to set things up
  && curl ${DOCKER_DEBIAN_URL} -sSf | bash -s "${ENABLE_NONROOT_DOCKER}" "/var/run/docker-host.sock" "/var/run/docker.sock" "${USERNAME}" "${USE_MOBY}" \
  # * Avoiding extension reinstalls on container rebuild
  && mkdir -p /home/${USERNAME}/.vscode-server/extensions \
  # * Persist zsh history between runs
  && SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/home/${USERNAME}/commandhistory/.zsh_history" \
  && mkdir -p /home/${USERNAME}/commandhistory \
  && touch /home/${USERNAME}/commandhistory/.zsh_history \
  && echo ${SNIPPET} >> "/home/${USERNAME}/.zshrc" \
  && chown -R ${USERNAME}:${USERNAME} /home/${USERNAME} \
  # * Create node_modules folder
  && mkdir -p ${WORKING_DIR}/node_modules \
  && chown -R ${USERNAME}:${USERNAME} ${WORKING_DIR} \
  # * Clean up
  && apt autoremove -y \
  && apt clean -y \
  && rm -rf /var/lib/apt/lists/*

USER ${USERNAME}

WORKDIR ${WORKING_DIR}

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]
