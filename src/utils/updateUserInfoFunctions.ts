const inputNameConventorMap = new Map([
    [ "username", 'username' ],
    [ "name", 'name' ],
    [ "currentAddress", 'current address' ],
    [ "pernamentAddress", 'pernament address' ],
    [ "dob", 'date of birth' ],
    [ "startDate", 'start date' ],
    [ "ico", 'ICO' ],
    [ "bankAccount", 'bank account' ],
    [ "compensation", 'compensation' ],
    [ "emplType", 'employment type' ],
    [ "currentAnnualLeave", 'current annual leave' ],
    [ "totalAnnualLeave", 'total annual leave' ],
    [ "annualLeaveLeft", 'annual leave left' ],
    [ "notes", 'notes' ],
])

export const sendEmail = (diffObj: any[], oldObject: any, username: string) => {
    const subject = `User with username: ${username} is asking to change`;
    const body: string = diffObj.reduce((acc, currentValue) => {
        // currentValue has object with {inputNameVar, value}
        const currentObjKey = Object.keys(currentValue)[ 0 ];
        const inputName = inputNameConventorMap.get(currentObjKey);
        acc += `Attribute: ${inputName}, from value: ${oldObject[ currentObjKey ]} to new value: ${currentValue[ currentObjKey ]}.\n`;
        return acc;
    }, '');

    // mailto:${process.env.REACT_APP_DEFAULT_EMAIL_FOR_NOTIFIACTIONS}
    // send the email
    window.open(`
        mailto:${username}
        ?subject=${subject}
        &body=${body}`);
}

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