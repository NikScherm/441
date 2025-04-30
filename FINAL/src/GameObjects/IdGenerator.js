
let objectIdCounter = 0;
export function generateObjectId(key) {
    return `${key}-${++objectIdCounter}`;
}
