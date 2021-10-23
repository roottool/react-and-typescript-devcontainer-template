ARG VARIANT=${VARIANT:-"bullseye"}
FROM mcr.microsoft.com/vscode/devcontainers/base:${VARIANT}

ARG USERNAME=${USERNAME:-"vscode"}

RUN apt update \
  && apt install -y --no-install-recommends \
  sudo \
  # * Add sudo support.
  && echo ${USERNAME} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USERNAME} \
  && chmod 0440 /etc/sudoers.d/${USERNAME} \
  # * Avoiding extension reinstalls on container rebuild
  && mkdir -p /home/${USERNAME}/.vscode-server/extensions \
  # * Persist zsh history between runs
  && SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/home/${USERNAME}/commandhistory/.zsh_history" \
  && mkdir -p /home/${USERNAME}/commandhistory \
  && touch /home/${USERNAME}/commandhistory/.zsh_history \
  && echo ${SNIPPET} >> "/home/${USERNAME}/.zshrc" \
  && chown -R ${USERNAME}:${USERNAME} /home/${USERNAME} \
  # * Clean up
  && apt autoremove -y \
  && apt clean -y \
  && rm -rf /var/lib/apt/lists/*

USER ${USERNAME}

ARG WORKING_DIR=/workspaces/{repository-name}
WORKDIR ${WORKING_DIR}

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]
