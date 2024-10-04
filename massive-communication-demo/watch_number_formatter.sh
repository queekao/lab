#!/bin/sh
if
    ! command -v watchexec
then
    echo "watchexec could not be found, installing..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux OS
        sudo apt-get update
        sudo apt-get install -y watchexec
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install watchexec
    else
        echo "Unsupported OS"
        exit 1
    fi
else
    echo "watchexec is already installed."
fi
watchexec --exts c "gcc number_formatter.c -o main"
