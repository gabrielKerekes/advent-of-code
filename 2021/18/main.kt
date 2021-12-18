import java.io.File

fun String.isInt() = toIntOrNull() != null

fun main() {
    val file = "input.txt"
    val lists = File(file)
        .useLines { it.toList() }

    val rs = mutableListOf<Int>()
    for (a in lists.indices) {
        for (b in lists.indices) {
            if (a == b) continue
            val results = listOf(lists[a], lists[b]).reduce { acc, string ->
                val joined = "[${acc},${string}]".split("").filter {it != ""}.toMutableList()
                var depth = 0
                var i = 0
                var exploding = true
                while (i < joined.size) {
                    var it = joined[i]
                    if (it == "[") depth++
                    else if (it == "]") depth--
                    else if (it != ",") {
                        if (depth >= 5 && exploding) {
                            var start = i - 1
                            while (start >= 0 && !joined[start].isInt()) {
                                start--
                            }
                            if (start >= 0) {
                                joined[start] = (joined[start].toInt() + it.toInt()).toString()
                            }
                            val secondNumber = joined[i + 2].toInt()
                            start = i + 3
                            while (start < joined.size && !joined[start].isInt()) {
                                start++
                            }
                            if (start < joined.size) {
                                joined[start] = (joined[start].toInt() + secondNumber).toString()
                            }
                            joined.removeAt(i - 1)
                            joined.removeAt(i - 1)
                            joined.removeAt(i - 1)
                            joined.removeAt(i - 1)
                            joined.removeAt(i - 1)
                            joined.add(i - 1, "0")
                            i = 0
                            depth = 0
                            continue
                        } else if (it.isInt() && it.toInt() > 9 && !exploding) {
                            joined.removeAt(i)
                            joined.addAll(i, listOf("[", "${it.toInt() / 2}", ",", "${Math.ceil(it.toInt() / 2.0).toInt()}", "]"))
                            i = 0
                            depth = 0
                            exploding = true
                            continue
                        }
                    }
                    i++
                    if (i == joined.size && exploding) {
                        i = 0
                        depth = 0
                        exploding = false
                    }
                }
                joined.joinToString("")
            }

            var resultsList = results.split("").filter {it != ""}.toMutableList()
            var i = 0
            while (i < resultsList.size) {
                if (resultsList[i].isInt() && i < resultsList.size - 2 && resultsList[i + 2].isInt()) {
                    val magnitude = 3 * resultsList[i].toInt() + 2 * resultsList[i + 2].toInt()
                    resultsList.removeAt(i-1)
                    resultsList.removeAt(i-1)
                    resultsList.removeAt(i-1)
                    resultsList.removeAt(i-1)
                    resultsList.removeAt(i-1)
                    resultsList.add(i - 1, magnitude.toString())
                    i = 0
                    continue
                }
                i++
            }
            rs.add(resultsList.joinToString("").toInt())
        }
    }
    println(rs.maxOrNull()!!)
}
