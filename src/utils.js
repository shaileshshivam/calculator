import { DISPLAY_LIMIT, OPERATION, ZERO } from "./constant"

export function isEmpty(str) {
    if (str.length === 0) {
        return true
    }

    return false
}

export function withInDisplayLimit(str) {
    if (str.length < DISPLAY_LIMIT) {
        return true
    }
    return false
}


export function computeOperationResult(operationHistory) {
    let operationResult = 0;

    operationHistory.forEach((value, index, opHistory) => {
        switch (value) {
            case OPERATION.PLUS: {
                operationResult += Number(opHistory[index + 1]);
            }
                break;

            case OPERATION.MINUS: {
                operationResult -= Number(opHistory[index + 1]);
            }
                break;

            case OPERATION.MULTIPLY: {
                operationResult *= Number(opHistory[index + 1])
            }
                break;

            case OPERATION.DIVIDE: {
                if (opHistory[index + 1] === ZERO || opHistory[index + 1] === "-0") {
                    throw new Error("Cannot divide by zero")
                }

                operationResult /= Number(opHistory[index + 1])
            }
                break;

            case OPERATION.PERCENT: {
                operationResult *= (opHistory[index + 1] / 100)
            }
                break;

            default: {
                if (index === 0) {
                    operationResult = Number(value)
                }
            }
        }
    })

    return operationResult
}