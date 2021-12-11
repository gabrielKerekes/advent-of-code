import java.io.File

data class Octopus(var value: Int, val x: Int, val y: Int, var flashed: Boolean = false)

fun List<List<Octopus>>.increaseEach() = this.map { it.map { Octopus(it.value + 1, it.x, it.y) } }

fun List<List<Octopus>>.flashThemAll() = this.map { row -> 
    row.map { octopus ->
        if (octopus.value > 9) {
            octopus.flash(this)
        }
        octopus
    } 
}

fun List<List<Octopus>>.step3() = this.map { row ->
    row.map { octopus -> 
        if (octopus.flashed) {
            Octopus(0, octopus.x, octopus.y)
        } else {
            Octopus(octopus.value, octopus.x, octopus.y)
        }
    }
}

fun Octopus.flash(octopuses: List<List<Octopus>>) {
    if (this.flashed) return

    val neighbors = this.neighbors(octopuses)
    neighbors.forEach { 
        it.value += 1
    }
    this.flashed = true
    neighbors.forEach {
        if (it.value > 9) it.flash(octopuses)
    }
}

fun Octopus.neighbors(octopuses: List<List<Octopus>>) = 
    (this.y - 1..this.y + 1)
        .filter { it >= 0 && it < octopuses.size }
        .map { row -> 
            (this.x - 1..this.x + 1)
                .filter { it >= 0 && it < octopuses[row].size }
                .filter { this.x != it || this.y != row }
                .map { column -> octopuses[row][column] }
        }
        .flatten()


fun main() {
    val octopuses = File("input.txt")
        .useLines { it.toList() }
        .map { it.chunked(1).map { it.toInt() } }
        .mapIndexed { y, row -> row.mapIndexed { x, value -> Octopus(value, x, y) } }
    
    println((1..100).fold(Pair(0, octopuses)) { current, _ -> 
        val (flashes, currentOctopuses) = current
        val afterFlashing = currentOctopuses.increaseEach().flashThemAll()
        val flashCount = afterFlashing.flatten().count { it.flashed }
        val stepResult = afterFlashing.step3()
        Pair(flashes + flashCount, stepResult)
    }.first)

    println((1..1000).fold(Triple(0, -1, octopuses)) { current, step -> 
        val (flashes, firstFlash, currentOctopuses) = current
        val afterFlashing = currentOctopuses.increaseEach().flashThemAll()
        val flashCount = afterFlashing.flatten().count { it.flashed }
        val stepResult = afterFlashing.step3()
        val newFirstFlash = if (flashCount == 100 && firstFlash == -1) step else firstFlash
        Triple(flashes + flashCount, newFirstFlash, stepResult)
    }.second)
}