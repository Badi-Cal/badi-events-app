#!/bin/sh

command=$1
IMAGE=badi-events-app

help() {
	messages=(
		"docker.sh <command>\n"
		"\t- help / --help: Displays this message\n"
		"\t- build: builds the Docker image\n"
		"\t- container: shows the current container name\n"
		"\t- enter: go to the bash terminal in the container\n"
		"\t- start: starts the docker container in the background\n"
		"\t- stop: stops the docker container\n"
		"\n"
	)
	printf "${messages[*]}"
}

error() {
	local error_message=$1
	printf "Error: $error_message\n\n"
	help
	exit 1
}

build() {
	docker build -t $IMAGE .
}

enter() {
	docker exec -it $(get_container_name) /bin/bash
}

get_container_name() {
	echo $(docker container ls | grep $IMAGE | awk '{print $(NF)}')
}

start() {
	docker run -d -v `pwd`:/app -p 1884:1884 $IMAGE
}

stop() {
	docker container stop $(get_container_name)
}

if [[ $command == help ]] || [[ $command == "--help" ]]; then
	help
elif [[ $command == build ]]; then
	build	
elif [[ $command == start ]]; then
	start
elif [[ $command == enter ]]; then
	enter	
elif [[ $command == stop ]]; then
	stop
elif [[ $command == container ]]; then
	echo $(get_container_name)
elif [[ $command == "" ]]; then
	error "Missing command"
else
	error "Invalid command"
fi
exit 0
