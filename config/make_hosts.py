import os

HOSTS = os.getenv('HOSTS')
if not (HOSTS and HOSTS.strip()):
	raise SystemExit("HOSTS var empty")
ips = HOSTS.split(" ")
file = open("hosts", "w")
file.write("[badiCalBadiEventsApp]\n")
for index, ip in enumerate(ips):
	file.write('inv%s ansible_ssh_host=%s\n'%(index, ip))
file.close()
