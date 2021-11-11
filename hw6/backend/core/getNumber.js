var guess = -1;

const genNumber = () => {
	guess = Math.floor((Math.random() * 100) + 1);
}

const getNumber = () => {
	return guess;
}

export {genNumber, getNumber};
