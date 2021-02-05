import os

HOSTS = os.getenv('HOSTS')
ips = HOSTS.split(" ")
file = open("hosts", "w") 
file.write("[badiCal]\n")
for index, ip in enumerate(ips):
	file.write('inv%s ansible_ssh_host=%s\n'%(index, ip)) 
file.close()
