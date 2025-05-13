type MyVarType = (number | string | boolean)[]

const myVar: MyVarType = []
const myVar2:  MyVarType = []

type Vector = {
    x: number
    y: number
}

interface Movement {
   translate(pointA: Vector, pointB: Vector) 
}

interface Movement2 {
    translate(pointA: Vector, pointB: Vector) 
}

function foo<T>(): T {
    return 'dfezfe' as T
}

const val = foo<string>()
val.toLowerCase()