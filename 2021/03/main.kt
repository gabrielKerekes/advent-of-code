import java.io.File

fun <T>transpose(matrix: List<List<T>>): List<List<T>> {
    return matrix.first().mapIndexed { index, _ ->  matrix.map { it[index] } }
}

fun main() {
    val result1 = transpose<Char>(
        File("input.txt")
            .useLines { it.toList() }
            .map { it.toList() }
    )
    .map { Pair(it.count { it == '0'}, it.count { it == '1'})}
    .map { if (it.first > it.second) Pair('0', '1') else Pair('1', '0') }
    .fold(Pair("", "")) { previous, current -> Pair(previous.first + current.first, previous.second + current.second)}
    .toList()
    .map { it.toInt(2)}
    .fold(1) { product, current -> product * current }

    println(result1)
    
    val values = transpose<Char>(
        File("smallInput.txt")
            .useLines { it.toList() }
            .map { it.toList() }
    )

    val filters = values
        .map { Pair(it.count { it == '0'}, it.count { it == '1'})}
        .map { if (it.first > it.second) Pair('0', '1') else Pair('1', '0') }
    
    println(result2)
}