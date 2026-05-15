const bcrypt = require('bcryptjs');
const password = 'PriyaArjun1718@Eagle';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
