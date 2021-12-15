import java.io.File

data class RiskLevel(val riskLevel: Int, val x: Int, val y: Int, var price: Int = Int.MAX_VALUE)

fun findPath(riskLevels: List<List<RiskLevel>>) {
    val alreadyChecked = mutableSetOf<RiskLevel>()
    val notChecked = riskLevels.flatten().toMutableList()
    while (!notChecked.isEmpty()) {
        val current = notChecked.minByOrNull { it.price }!!
        val x = current.x
        val y = current.y
        listOf(Pair(x - 1, y), Pair(x + 1, y), Pair(x, y - 1), Pair(x, y + 1))
            .filter { it.first >= 0 && it.first < riskLevels.size }
            .filter { it.second >= 0 && it.second < riskLevels[0].size }
            .filter { !alreadyChecked.contains(riskLevels[it.second][it.first]) }
            .forEach { 
                val n = riskLevels[it.second][it.first]
                if (current.price + n.riskLevel < n.price) {
                    n.price = current.price + n.riskLevel
                }
            }

        alreadyChecked.add(current)
        notChecked.remove(current)
    }
}

fun increasedRiskLevelX(riskLevel: RiskLevel, size: Int): RiskLevel {
    var newRiskLevel = riskLevel.riskLevel + 1
    if (newRiskLevel > 9) newRiskLevel = 1
    return RiskLevel(newRiskLevel, riskLevel.x + size, riskLevel.y, riskLevel.price)
}

fun increasedRiskLevelY(riskLevel: RiskLevel, size: Int): RiskLevel {
    var newRiskLevel = riskLevel.riskLevel + 1
    if (newRiskLevel > 9) newRiskLevel = 1
    return RiskLevel(newRiskLevel, riskLevel.x, riskLevel.y + size, riskLevel.price)
}

fun main() {
    val file = "input.txt"
    var riskLevels = File(file)
        .useLines { it.toList() }
        .mapIndexed { y, row -> row.chunked(1).mapIndexed { x, riskLevel -> RiskLevel(riskLevel.toInt(), x, y) } }
        
    riskLevels[0][0].price = 0

    findPath(riskLevels)
    println(riskLevels.last().last().price)

    var largeRiskLevels = File(file)
        .useLines { it.toList() }
        .mapIndexed { y, row -> row.chunked(1).mapIndexed { x, riskLevel -> RiskLevel(riskLevel.toInt(), x, y) } }
        .toMutableList()
    
    // for (i in 1..5) {
    val size = largeRiskLevels.size
    largeRiskLevels = largeRiskLevels.map { row -> 
        val firstAddition = row.map { increasedRiskLevelX(it, size) }
        val secondAddition = firstAddition.map { increasedRiskLevelX(it, size) }
        val thirdAddition = secondAddition.map { increasedRiskLevelX(it, size) }
        val fourthAddition = thirdAddition.map { increasedRiskLevelX(it, size) }

        row + firstAddition + secondAddition + thirdAddition + fourthAddition
    }.toMutableList()

    for (i in 0..3) {
        for (j in size * i..size * i + size - 1) {
            largeRiskLevels.add(largeRiskLevels[j].map { increasedRiskLevelY(it, size) })
        }
    }

    largeRiskLevels[0][0].price = 0

    findPath(largeRiskLevels)
    println(largeRiskLevels.last().last().price)
}