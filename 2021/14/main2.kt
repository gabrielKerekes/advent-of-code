import java.io.File

fun pairsGeneratedBy(pairs: Map<String, String>, pair: String): Pair<String, String> {
    val transformation = pairs[pair]!!
    return Pair(pair[0].toString() + transformation, transformation + pair[1].toString())
}

fun increaseCharCount(charCounts: MutableMap<Char, Long>, char: Char, count: Long) {
    if (!charCounts.containsKey(char)) {
        charCounts.set(char, 0)
    }
    charCounts.set(char, charCounts[char]!! + count)
}

fun main() {
    val fila = "input.txt"
    var polymer = File(fila)
        .useLines { it.toList() }
        .take(1)
        .map { it.toMutableList() }
        .first()

    val pairs = File(fila)
        .useLines { it.toList() }
        .drop(2)
        .map { it.split(" -> ") }
        .map { it[0] to it[1] }
        .toMap()
    
    val charCountss = mutableMapOf<Char, Long>()
    polymer.forEach { 
        increaseCharCount(charCountss, it, 1)
    }

    var counts = pairs.map { it.key to 0L }.toMap().toMutableMap()
    val currentPairs = polymer.zipWithNext().map { it.first.toString() + it.second.toString() }
    currentPairs.forEach { pair ->
        val p = pairsGeneratedBy(pairs, pair).toList()
        increaseCharCount(charCountss, p[0][1], 1)
        p.forEach { counts.set(it, counts.get(it)!! + 1) }
    }

    for (i in 2..40) {
        val newCounts = counts.map {it.key to 0L}.toMap().toMutableMap()
        counts.forEach { pair ->
            val p = pairsGeneratedBy(pairs, pair.key).toList()
            increaseCharCount(charCountss, p[0][1], pair.value)
            p.forEach { newCounts.set(it, newCounts.get(it)!! + pair.value) }
        }
        counts = newCounts
    }

    val min = charCountss.minByOrNull { it.value }!!
    val max = charCountss.maxByOrNull { it.value }!!
    println(max.value - min.value)
}