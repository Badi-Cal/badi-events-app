import os

HOSTS = os.getenv('HOSTS')
ips = HOSTS.split(" ")
for ip in ips:
	os.system('ssh-keyscan -H %s >> ~/.ssh/known_hosts'%(ip))
	os.system('ssh -i id_rsa deploy@%s \'exit 0\' && echo $?'%(ip))
