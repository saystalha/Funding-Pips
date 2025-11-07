console.log("Hello World")
let a = (2 + 3)
console.log(a)
let b = (2 + 3 * 3)
console.log(b)
let c = (2 + 3 / 4)
console.log(c)
let d = (2 + 3 % 2)
console.log(d)
let e = (2 + 3 * 2 / 3)
console.log(e)
let f = (2 - 3)
console.log(f)
let g = (2 - 4 / 2)
console.log(g)

const arr = [1, 2, 3, 4, 5, "Talha", 'A', true, 0.3]
console.log(arr)
console.log(arr[2])

const stu = {
    name: "Umer",
    age: 12,
    isgood: true,
    hobbies: ["Sports", "Reading", "Coding"],
    uni: {
        uni: "HEC Approved",
        Sector: "Private"
    }
}
console.log(stu)
console.log(stu.age)
console.log(stu.name)
console.log(stu.hobbies[0])
console.log(stu.uni.Sector)

if (stu.age == 12) {
    console.log("Condition is Successfully implemented")
}
else if (stu.age == 13) {

}
else if (stu.age == 14) {

}
else {
    console.log("Condition is Not Successfully implemented")
}
for (let i = 0; i < 5; i++) {
    console.log(arr[i])
}
let cond = 10
while (cond > 0) {
    console.log(cond)
    cond--
}
console.log(Math.random())
let winingNum = Math.floor(Math.random() * 100)
console.log("Wining Number is: " + winingNum)

