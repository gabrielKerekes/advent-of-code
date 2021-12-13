import java.io.File
import kotlin.arrayOfNulls

fun MutableSet<Pair<Int, Int>>.foldByAxis(axis: String, value: Int) =
    if (axis == "x") {
        map { 
            if (it.first > value) {
                Pair(value - (it.first - value), it.second)
            } else {
                it
            }
        }.toMutableSet()
    } else {
        map { 
            if (it.second > value) {
                Pair(it.first, value - (it.second - value))
            } else {
                it
            }
        }.toMutableSet()
    }

fun main() {
    var dots = mutableSetOf<Pair<Int, Int>>()
    val folds = mutableListOf<Pair<String, Int>>()

    File("input.txt")
        .useLines { it.toList() }
        .filter { !it.isEmpty() }
        .forEach { 
            val isFold = it.startsWith("fold")
            if (isFold) {
                val (axis, value) = it.split(" ").last().split("=")
                folds.add(Pair(axis, value.toInt()))
            }
            else {
                val (x, y) = it.split(",").map { it.toInt() }
                dots.add(Pair(x, y))
            }
        }

    folds.take(1).forEach { dots = dots.foldByAxis(it.first, it.second) }

    println(dots.size)

    folds.drop(0).forEach { dots = dots.foldByAxis(it.first, it.second) }

    val maxX = dots.map { it.first }.maxOf { it }
    val maxY = dots.map { it.second }.maxOf { it }

    val field = arrayOfNulls<Array<String?>>(maxY + 1)
    for (i in 0..maxY) {
        field[i] = arrayOfNulls<String>(maxX + 1)
    }

    dots.forEach { field[it.second]!![it.first] = "#" }

    for (row in field) {
        for (v in row!!) {
            if (v == null) {
                print(".")
            } else {
                print("#")
            }
        }
        println()
    }
}