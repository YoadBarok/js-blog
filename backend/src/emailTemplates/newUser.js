let template = (code) => {
return `
<h1>Welcome to my Login App!</h1>
<h2>Please verify your account by clicking the following link:</h2>
<a href="http://localhost:3001/user/verify/${code}">Click me!</a>
`
}    

export {template};