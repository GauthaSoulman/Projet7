class StringUtils {
    normalizeString(str) {
        if (str.length > 0) {
            return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
    }

    capitalizeString(str) {
        if (str.length > 0) {
            return str[0].toUpperCase() + str.slice(1).toLowerCase()
        }
    }
}