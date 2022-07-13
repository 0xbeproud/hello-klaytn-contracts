clean:
	npx hardhat clean

check:
	npx hardhat check

node:
	npx hardhat node

compile: clean
	npx hardhat compile

test:
	npx hardhat test