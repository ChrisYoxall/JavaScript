

function greet(name: string, date: Date) {
    console.log(`Hello ${name}, today is ${date.toDateString()}`)
}

// Specify the type here will result in an error, as the type is trivial to infer.
const person = "Chris"
greet(person, new Date());