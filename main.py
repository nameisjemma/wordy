f = open("Intermediate.txt")
nf = open("IntermediateU.txt", "w")

for l in f:
	l = l.strip()
	words=l.split(",")
	print(words)
	nf.write(words[0].capitalize() + "," + words[1].capitalize() + "," + words[2].capitalize() + "\n")


