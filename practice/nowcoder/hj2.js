// const [a,b] = readline().split(' ');
const a = readline() 
const b  = readline() 
const regexp = new RegExp( `${b}` ,'ig')
console.log( a.match(regexp) && a.match(regexp).length || 0 )
