import java.io.File

fun main() {
    val result1 = File("input.txt")
        .useLines { it.toList() }
        .map { it.toInt() }
        .zipWithNext { previous, next -> next - previous }
        .filter { it > 0 }
        .size

    println(result1)

    val result2 = File("input.txt")
        .useLines { it.toList() }
        .map { it.toInt() }
        .zipWithNext()
        .zipWithNext {previous, next -> previous.first + previous.second + next.second}
        .zipWithNext { previous, next -> next - previous }
        .filter { it > 0 }
        .size

    println(result2)
}