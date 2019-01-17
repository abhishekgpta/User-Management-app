const add = (a,b)=> a+b;
const generateGreeting = (name='Anonymous')=> `hello ${name}!`;
test('should add 2 numbers', ()=>{
	const result = add(3,4);
	expect(result).toBe(7);
});

test('should generate greeting from name',()=>{
	const result = generateGreeting('Abhishke');
	expect(result).toBe('hello Abhishke!');
});

test('should generate greeting for no name',()=>{
	const result = generateGreeting();
	expect(result).toBe('hello Anonymous!');
});
