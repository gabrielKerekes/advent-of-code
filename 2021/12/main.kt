import java.io.File

data class StackItem(val node: String, val path: List<String>, val hasLowerDuplicate: Boolean = false)

fun MutableMap<String, MutableList<String>>.addPair(parent: String, neighbor: String) {
    if (this.containsKey(parent)) {
        this[parent]!!.add(neighbor)
    } else {
        this.put(parent, listOf(neighbor).toMutableList())
    }
}

fun main() {
    val lines = File("input.txt")
        .useLines { it.toList() }
        .map { it.split("-")}

    val neighbors = mutableMapOf<String, MutableList<String>>()
    for ((parent, neighbor) in lines) {
        neighbors.addPair(parent, neighbor)
        neighbors.addPair(neighbor, parent)
    }

    val stack = ArrayDeque(listOf(StackItem("start", listOf("start"))))
    
    val paths = mutableListOf<List<String>>()
    while (!stack.isEmpty()) {
        val (node, path) = stack.removeFirst()
        if (path.last() == "end") {
            paths.add(path)
            continue
        }

        neighbors
            .getOrDefault(node, mutableListOf())
            .filter { it[0].isUpperCase() || !path.contains(it) }
            .forEach { neighbor -> stack.add(StackItem(neighbor, path + neighbor)) }
    }

    println(paths.size)

    val stack2 = ArrayDeque(listOf(StackItem("start", listOf("start"))))
    
    val paths2 = mutableListOf<List<String>>()
    while (!stack2.isEmpty()) {
        val (node, path, hasLowerDuplicate) = stack2.removeFirst()

        if (path.last() == "end") {
            paths2.add(path)
            continue
        }

        neighbors
            .getOrDefault(node, mutableListOf())
            .filter { it != "start" }
            .forEach { 
                if (!hasLowerDuplicate) {
                    if (it[0].isLowerCase() && path.count { n -> n == it } == 1) {
                        stack2.add(StackItem(it, path + it, true))
                    } else {
                        stack2.add(StackItem(it, path + it, false))
                    }
                } else if (it[0].isUpperCase() || !path.contains(it)) {
                    stack2.add(StackItem(it, path + it, true))
                }
            }
    }

    println(paths2.size)
}