declare global {
    interface Array<T> {
        GroupBy(keyValue : string) : T[][];
    }
}

Array.prototype.GroupBy = function <T>(this: Array<T>, keyValue : string)  {
    const group = this.reduce((map : any, e : any) => {
        const key = e[keyValue];
        map[key] = map[key] ? [...map[key], e] : [e];
        return map;
    }, {});

    let objectAgrouped = [];
    for (let i in group) { 
        objectAgrouped.push(group[i])
    }

    return objectAgrouped;
};


export {}

export function distinct(key : string, value : string, index : number, array : any[]) {
    return array.map(element => element[key]).indexOf(value) == index;
}
