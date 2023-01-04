let template = (code) => {
return `
<h1>Thank you for signing up for Buban Blog!</h1>
<h2>Please verify your account by clicking the following link:</h2>
<a href="${process.env.URL || `http://localhost:${process.env.PORT}`}/user/verify/${code}">Click me!</a>
`
}    

export {template};