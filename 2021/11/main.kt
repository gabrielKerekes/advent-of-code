import java.io.File

data class Octopus(var value: Int, val x: Int, val y: Int, var flashed: Boolean = false)

fun List<List<Octopus>>.energizeThem() = this.flatten().forEach { it.value++ }

fun List<List<Octopus>>.flashThem() = this.flatten().filter { it.value > 9 }.forEach { it.flash(this) }

fun Octopus.flash(octopuses: List<List<Octopus>>) {
    if (this.flashed) return

    this.flashed = true

    this.getNeighbors(octopuses).forEach { 
        it.value += 1
        if (it.value > 9) it.flash(octopuses)
    }
}

fun Octopus.getNeighbors(octopuses: List<List<Octopus>>) = 
    (this.y - 1..this.y + 1)
        .filter { it >= 0 && it < octopuses.size }
        .map { row -> 
            (this.x - 1..this.x + 1)
                .filter { it >= 0 && it < octopuses[row].size }
                .filter { this.x != it || this.y != row }
                .map { column -> octopuses[row][column] }
        }
        .flatten()

fun List<List<Octopus>>.countThem() = this.flatten().count { it.flashed }

fun List<List<Octopus>>.resetThem() = this.flatten().filter { it.flashed }.forEach { 
    it.value = 0
    it.flashed = false
}


fun main() {
    val octopuses = File("input.txt")
        .useLines { it.toList() }
        .map { it.chunked(1).map { it.toInt() } }
        .mapIndexed { y, row -> row.mapIndexed { x, value -> Octopus(value, x, y) } }
    
    println((1..100).fold(0) { numOfFlashes, _ -> 
        octopuses.energizeThem()
        octopuses.flashThem()
        val flashCount = octopuses.countThem()
        octopuses.resetThem()
        numOfFlashes + flashCount
    })

    val octopuses2 = File("input.txt")
        .useLines { it.toList() }
        .map { it.chunked(1).map { it.toInt() } }
        .mapIndexed { y, row -> row.mapIndexed { x, value -> Octopus(value, x, y) } }

    var step = 0
    while (true) {
        step++
        octopuses2.energizeThem()
        octopuses2.flashThem()
        if (octopuses2.countThem() == 100) break
        octopuses2.resetThem()
    }

    println(step)
}