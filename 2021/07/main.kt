import java.io.File

fun main() {
    val crabPositions = File("input.txt")
        .useLines { it.toList() }
        .map { it.split(",") }
        .first()
        .map { it.toInt() }
        .sorted()

    val medianCrabPosition = crabPositions[crabPositions.size/2]
    val totalDistanceFromMedianCrab = crabPositions.fold(0) { 
        totalDistance, crabPosition -> totalDistance + Math.abs(medianCrabPosition - crabPosition)
    }
    println(totalDistanceFromMedianCrab)

    val minCrabPosition = crabPositions.minOrNull()!!
    val maxCrabPosition = crabPositions.maxOrNull()!!

    var distancesFrom = MutableList(maxCrabPosition - minCrabPosition) {0}
    crabPositions.forEach { crabPosition -> 
        distancesFrom = distancesFrom.mapIndexed { positionCandidate, positionGasCost -> 
            val distance = Math.abs(crabPosition - positionCandidate)
            val gasCost = distance * (distance + 1) / 2
            positionGasCost + gasCost
        }.toMutableList()
    }
    
    val bestPosition = distancesFrom.indexOf(distancesFrom.minOrNull()!!)
    println(bestPosition)
    val totalDistanceFromBestPosition = crabPositions.fold(0) { totalDistanceFromBestPosition, position -> 
        val distance = Math.abs(position - bestPosition)
        val gasCost = distance * (distance + 1) / 2
        totalDistanceFromBestPosition + gasCost
    }
    println(totalDistanceFromBestPosition)
}