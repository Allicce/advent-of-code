String.prototype.halve = function() {
    const length = Math.floor(this.length / 2)
    const first = this.slice(0, length)
    const second = this.slice(length, this.length)

    return [first, second]
}

String.prototype.isUpperCase = function() {
    return this.charCodeAt(0) < "a".charCodeAt(0)
}