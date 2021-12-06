import java.io.File

fun main() {
    var result1 = File("input.txt")
        .useLines { it.toList() }
        .map { it.split(",") }
        .first()
        .map { it.toInt() }
        .toMutableList()

    for (i in 0..79) {
        val newFish = result1.count { it == 0}
        result1 = result1.map { it - 1 }.map { if (it != -1) it else 6 }.toMutableList()
        result1.addAll(MutableList(newFish) { 8 })
    }
        
    println(result1.size)

    var result2 = File("input.txt")
        .useLines { it.toList() }
        .map { it.split(",") }
        .first()
        .map { it.toInt() }
        .fold(mutableListOf(0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L)) { counts, v -> 
            counts[v]++
            counts
        }

    for (i in 0..255) {
        val zeroes = result2.removeFirst()
        result2.add(zeroes)
        result2[6] += zeroes
    }
        
    println(result2.fold(0L) { acc, it -> acc + it })
}