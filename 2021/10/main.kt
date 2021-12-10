import java.io.File

fun main() {
    val lines = File("input.txt")
        .useLines { it.toList() }
        .map { it.chunked(1) }

    val openingBrackets = listOf("(", "[", "{", "<")
    val closingBrackets = listOf(")", "]", "}", ">")
    
    val corruptedBrackets = mutableListOf<String>()
    val errorScores = mutableListOf<Long>()
    for (line in lines) {
        val stack = ArrayDeque<String>(0)
        var isCorrupted = false
        for (bracket in line) {
            if (openingBrackets.contains(bracket)) {
                stack.add(bracket)
            } else {
                if (stack.isEmpty()) break
                val lastOpenBracket = stack.removeLast()
                if (openingBrackets.indexOf(lastOpenBracket) != closingBrackets.indexOf(bracket)) {
                    corruptedBrackets.add(bracket)
                    isCorrupted = true
                    break
                }
            }
        }
        if (!isCorrupted) {
            val pointsPerBracket = mapOf("(" to 1, "[" to 2, "{" to 3, "<" to 4)
            stack.reverse()
            errorScores.add(stack.fold(0L) {errorScore, value ->
                errorScore * 5 + pointsPerBracket[value]!!
            })
        }
    }

    val pointsPerBracket = mapOf(")" to 3, "]" to 57, "}" to 1197, ">" to 25137)

    println(corruptedBrackets.sumOf { pointsPerBracket.getOrDefault(it, 0) })

    errorScores.sort()
    println(errorScores[errorScores.size / 2])
}