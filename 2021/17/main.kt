data class Props(val x: Int, val y: Int, val vx: Int, val vy: Int)

fun move(props: Props): Props {
    val vx = if (props.vx > 0) {
        props.vx - 1
    } else if (props.vx < 0) {
        props.vx + 1
    } else {
        props.vx
    }
    return Props(props.x + props.vx, props.y + props.vy, vx, props.vy - 1)
}

fun main() {
    val xMin = 287
    val xMax = 309
    val yMin = -76
    val yMax = -48

    var maxY = 0
    var propsSuccess = mutableSetOf<Props>()
    for (vx in 0..1000) {
        for (vy in -2000..2000) {
            var props = Props(0, 0, vx, vy)
            val propsInTime = mutableListOf(props)
            while ((props.x <= xMax && props.y >= yMin && vx > 0) && (props.x < xMin || props.y < yMin || props.y > yMax)) {
                props = move(props)
                propsInTime.add(props)
            }
            if (props.x >= xMin && props.x <= xMax && props.y >= yMin && props.y <= yMax) {
                val maxYCandidate = propsInTime.maxByOrNull { it.y }!!.y
                if (maxYCandidate > maxY) maxY = maxYCandidate
                propsSuccess.add(propsInTime.first())
            }
        }
    }
    println(maxY)
    println(propsSuccess.size)
}
