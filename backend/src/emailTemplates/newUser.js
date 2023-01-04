const local = process.env.URL + ":" + process.env.PORT;
const hosted = process.env.URL;

const environment = local.match("localhost") ? local : hosted;
console.log(environment);
console.log(local);

let template = (code) => {
return `
<h1>Thank you for signing up for Buban Blog!</h1>
<h2>Please verify your account by clicking the following link:</h2>
<a href="${environment}/user/verify/${code}">Click me!</a>
`
}    

export {template};