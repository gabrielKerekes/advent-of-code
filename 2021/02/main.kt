import java.io.File

fun main() {
    val result1 = File("input.txt")
        .useLines { it.toList() }
        .map {it.split(" ") }
        .map {Pair(it[0], it[1].toInt())}
        .fold(Pair(0, 0)) {(x, y), (instruction, steps) -> 
            when (instruction) {
                "forward" -> Pair(x + steps, y)
                "down" -> Pair(x, y + steps)
                "up" -> Pair(x, y - steps)
                else -> throw Error("Should not happen")
            }
        }
        .toList()
        .fold(1) { product, value -> product * value}

    println(result1)

    val result2 = File("input.txt")
        .useLines { it.toList() }
        .map {it.split(" ") }
        .map {Pair(it[0], it[1].toInt())}
        .fold(Triple(0L, 0L, 0L)) {(x, y, aim), (instruction, steps) -> 
            when (instruction) {
                "forward" -> Triple(x + steps, y + (aim * steps), aim)
                "down" -> Triple(x, y, aim + steps)
                "up" -> Triple(x, y, aim - steps)
                else -> throw Error("Should not happen")
            }
        }
        .toList()
        .take(2)
        .fold(1L) { product, value -> product * value}
    
    println(result2)
}