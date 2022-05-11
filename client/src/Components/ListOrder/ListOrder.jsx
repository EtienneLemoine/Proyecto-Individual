export const orderAZ = (a,b) => {
    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
    return 0
}

export const height = (a,b) => {
    if(a.height < b.height) return 1
    if(a.height > b.height) return -1
    return 0
}

export const weight = (a,b) => {
    if(a.weight < b.weight) return 1
    if(a.weight > b.weight) return -1
    return 0
}
export const life_span = (a,b) => {
    if(a.life_span < b.life_span) return 1
    if(a.life_span > b.life_span) return -1
    return 0
}
