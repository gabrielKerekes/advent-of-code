import kotlin.math.exp

fun hexToBin(hex: String): String {
    return hex.chunked(1).map {
        when (it) {
            "0" -> "0000"
            "1" -> "0001"
            "2" -> "0010"
            "3" -> "0011"
            "4" -> "0100"
            "5" -> "0101"
            "6" -> "0110"
            "7" -> "0111"
            "8" -> "1000"
            "9" -> "1001"
            "A", "a" -> "1010"
            "B", "b" -> "1011"
            "C", "c" -> "1100"
            "D", "d" -> "1101"
            "E", "e" -> "1110"
            "F", "f" -> "1111"
            else -> throw Error("Should not happen")
        }
    }.joinToString("")
}

fun parseLiteral(packet: String, offset: Int): Pair<String, Int> {
    val numbers = mutableListOf<String>()
    var end = offset + 6
    for (number in packet.drop(end).chunked(5)) {
        numbers.add(number.drop(1))
        end += 5
        if (number[0] == '0') break
    }
    return Pair(numbers.joinToString(""), end)
}

data class Result(val end: Int, val result: Long)

fun parse(packet: String, offset: Int): Result {
    val type = packet.drop(offset + 3).take(3).toInt(2)
    if (type == 4) {
        val (numberString, end) = parseLiteral(packet, offset)
        val number = numberString.toLong(2)
        return Result(end, number)
    }

    var newOffset = offset

    val numbers = mutableListOf<Long>()
    val lengthType = packet.drop(offset + 6).take(1)
    if (lengthType == "0") {
        var length = packet.drop(offset + 7).take(15).toInt(2)

        newOffset = offset + 22
        while (length > 0) {
            val r = parse(packet, newOffset)
            length -= r.end - newOffset
            newOffset = r.end
            numbers.add(r.result)
        }
    } else {
        val numberOfSubPackets = packet.drop(offset + 7).take(11).toInt(2)
        newOffset = offset + 18
        for (i in 1..numberOfSubPackets) {
            val r = parse(packet, newOffset)
            newOffset = r.end
            numbers.add(r.result)
        }
    }

    return Result(newOffset, when (type) {
        0 -> numbers.sum()
        1 -> numbers.fold(1L) { product, n -> product * n }
        2 -> numbers.minOrNull()!!
        3 -> numbers.maxOrNull()!!
        5 -> if (numbers[0] > numbers[1]) 1L else 0L
        6 -> if (numbers[0] < numbers[1]) 1L else 0L
        7 -> if (numbers[0] == numbers[1]) 1L else 0L
        else -> throw Error("Should not happen")
    })
}

fun main() {
    val hex = "E20D4100AA9C0199CA6A3D9D6352294D47B3AC6A4335FBE3FDD251003873657600B46F8DC600AE80273CCD2D5028B6600AF802B2959524B727D8A8CC3CCEEF3497188C017A005466DAA6FDB3A96D5944C014C006865D5A7255D79926F5E69200A164C1A65E26C867DDE7D7E4794FE72F3100C0159A42952A7008A6A5C189BCD456442E4A0A46008580273ADB3AD1224E600ACD37E802200084C1083F1540010E8D105A371802D3B845A0090E4BD59DE0E52FFC659A5EBE99AC2B7004A3ECC7E58814492C4E2918023379DA96006EC0008545B84B1B00010F8E915E1E20087D3D0E577B1C9A4C93DD233E2ECF65265D800031D97C8ACCCDDE74A64BD4CC284E401444B05F802B3711695C65BCC010A004067D2E7C4208A803F23B139B9470D7333B71240050A20042236C6A834600C4568F5048801098B90B626B00155271573008A4C7A71662848821001093CB4A009C77874200FCE6E7391049EB509FE3E910421924D3006C40198BB11E2A8803B1AE2A4431007A15C6E8F26009E002A725A5292D294FED5500C7170038C00E602A8CC00D60259D008B140201DC00C401B05400E201608804D45003C00393600B94400970020C00F6002127128C0129CDC7B4F46C91A0084E7C6648DC000DC89D341B23B8D95C802D09453A0069263D8219DF680E339003032A6F30F126780002CC333005E8035400042635C578A8200DC198890AA46F394B29C4016A4960C70017D99D7E8AF309CC014FCFDFB0FE0DA490A6F9D490010567A3780549539ED49167BA47338FAAC1F3005255AEC01200043A3E46C84E200CC4E895114C011C0054A522592912C9C8FDE10005D8164026C70066C200C4618BD074401E8C90E23ACDFE5642700A6672D73F285644B237E8CCCCB77738A0801A3CFED364B823334C46303496C940"
    val binary = hexToBin(hex)
    // part 1 was done differently and is not included, sorry
    println(parse(binary, 0).result)
}
