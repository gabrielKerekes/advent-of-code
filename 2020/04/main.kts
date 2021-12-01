import java.io.File

val REQUIRED_FIELDS = listOf("byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid")
val EYE_COLORS = setOf("amb", "blu", "brn", "gry", "grn", "hzl", "oth")

val lines = File("input.txt").useLines { it.toList() }

var validPassportsPart1 = 0
var validPassportsPart2 = 0

var passport = mutableMapOf<String, String>()
for (line in lines) {
    if (line == "") {
        validPassportsPart1 += if (REQUIRED_FIELDS.all { passport.contains(it) }) 1 else 0
        validPassportsPart2 += if (validatePassport(passport)) 1 else 0
        passport.clear()
        continue
    }

    val splitLine = line.split(" ")
    for (kvp in splitLine) {
        val splitKvp = kvp.split(":")
        val key = splitKvp[0]
        val value = splitKvp[1]
        passport[key] = value
    }
}

validPassportsPart1 += if (REQUIRED_FIELDS.all { passport.contains(it) }) 1 else 0
validPassportsPart2 += if (validatePassport(passport)) 1 else 0

println(validPassportsPart1)
println(validPassportsPart2)

fun validatePassport(passport: Map<String, String>) = REQUIRED_FIELDS.all { passport.contains(it) }
        && validateYear(passport.getValue("byr"), 1920, 2002)
        && validateYear(passport.getValue("iyr"), 2010, 2020)
        && validateYear(passport.getValue("eyr"), 2020, 2030)
        && validateHeight(passport.getValue("hgt"))
        && validateHairColor(passport.getValue("hcl"))
        && validateEyeColor(passport.getValue("ecl"))
        && validatePid(passport.getValue("pid"))

fun validateYear(year: String, min: Int, max: Int) = year.toInt() >= min && year.toInt() <= max

fun validateHeight(height: String): Boolean {
    val units = height.takeLast(2)
    return if (units == "cm") {
        val size = height.take(height.length - 2).toInt()
        size >= 150 && size <= 193
    } else if (units == "in") {
        val size = height.take(height.length - 2).toInt()
        size >= 59 && size <= 76
    } else {
        false
    }
}

fun validateHairColor(color: String) = Regex("#[0-9a-f]{6}").matches(color)

fun validateEyeColor(color: String) = color in EYE_COLORS

fun validatePid(pid: String) = Regex("[0-9]{9}").matches(pid)
