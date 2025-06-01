---
title: Instalacja Nodejs
date: 2024-06-14
language: Polski
subtitle: Kilka linków i skryptów aby zainstalować Node.js
tags:
  - Nodejs
---


Na kilka sposobów możemy zainstalować Node.js na komputerze. Jest to uzależnione również od systemu operacyjnego, który posiadamy. Osobiście polecam `nvm`, czyli Node Version Manager. Za jego pomocą można w prosty sposób zmieniać wersje Node.js.

```bash
nvm use 16 # zmiana wersji
nvm install 18 # instalacja nowej wersji
nvm use default 18 # domyślna wersja 
```

# Linux
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

# Windows 
Jeśli chodzi o Windows, znalazłem to repozytorium [nvm-windows](https://github.com/coreybutler/nvm-windows/wiki#manual-installation)
 z opisem instalacji. Niestety nie mogłem go przetestować. 

Tutaj jest strona [Microsoft](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows) z instrukcją instalacji. Pewnie zacząłbym od tego miejsca.   
# Links
https://github.com/nvm-sh/nvm

Date: 202406140842

