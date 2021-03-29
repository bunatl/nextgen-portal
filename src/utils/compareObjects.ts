export const compareObjects = (oldObject: any, updatedObj: any): any[] => {
    let diff: any[] = [];
    for (let key in updatedObj) {
        if (updatedObj[ key ] !== oldObject[ key ])
            diff.push({
                [ key ]: updatedObj[ key ]
            });
    }
    return diff;
}