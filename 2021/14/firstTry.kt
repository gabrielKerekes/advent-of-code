import java.io.File
import kotlin.comparisons.maxOf

fun main() {
    val fila = "smallInput.txt"
    var polymer = File(fila)
        .useLines { it.toList() }
        .take(1)
        .map { it.toMutableList() }
        .first()

    val w = File(fila)
        .useLines { it.toList() }
        .drop(2)
        .map { it.split(" -> ") }
        .map { it[0] to it[1] }
        .toMap()

    val c2 = w.map{it.key to 0}.toMap().toMutableMap()
    for (i in 1..15) {
        var inserted = 1
        val c = w.map{it.key to 0}.toMap().toMutableMap()
        polymer
            .zipWithNext()
            .map { it.first.toString() + it.second.toString() }
            .forEachIndexed { index, it ->
                if (!w.containsKey(it)) return
                polymer.add(index + inserted, w[it]!![0])
                inserted++
                if (c.containsKey(it)) c.set(it, c[it]!! + 1) else c.set(it, 1)
                if (c2.containsKey(it)) c2.set(it, c2[it]!! + 1) else c2.set(it, 1)
            }
        // println(c)
        // println(polymer.size)
        val counts = mutableMapOf<Char, Int>()
        polymer.forEach { if (counts.containsKey(it)) counts.set(it, counts[it]!! + 1) else counts.set(it, 1) }
        // println(i)
        // println(counts)
        // println(counts.map{it.value/polymer.size.toDouble()})
        println(counts['H']!!)
        // println(counts['B']!!/polymer.size.toDouble() - counts['H']!!/polymer.size.toDouble())
        // println(counts['N']!!/polymer.size.toDouble() + counts['C']!!/polymer.size.toDouble())
        // println(counts['B']!!/polymer.size.toDouble() + counts['C']!!/polymer.size.toDouble())
        // println(counts['H']!!/polymer.size.toDouble() + counts['C']!!/polymer.size.toDouble())
        // counts.forEach { println("${it} -> ${polymer.size/it.value.toDouble()}") }
    }
    // println(c2)
    val counts = mutableMapOf<Char, Int>()
    polymer.forEach { if (counts.containsKey(it)) counts.set(it, counts[it]!! + 1) else counts.set(it, 1) }
    val max = counts.maxByOrNull { it.value }!!
    val min = counts.minByOrNull { it.value }!!
    println(max.value - min.value)

    println()
    var size = 4L
    for (i in 1..15) {
        size *= 2
        size--
        println(size)
    }
    println(size)

    // B - 6
    // N - 3
    // H - 2
    // C - 5

    // var index = 0
    // val original = polymer
    // while (true) {
    //     val one = original[index]
    //     val two = original[index + 1]
    //     val t = one.toString() + two.toString()
    //     if (w.containsKey(t)) {
    //         val prefix = if (index > 0) polymer.take(index - 1) else ""
    //         val sufix = if (index < polymer.length - 1) polymer.drop(index + 1) else ""
    //         polymer = prefix + one + w[t]!! + two + sufix
    //     }
    //     index++
    //     println(polymer)
    // }
    // println(polymer)
}