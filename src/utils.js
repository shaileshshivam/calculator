import { DISPLAY_LIMIT, OPERATION } from "./constant"

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
    let precisionDigits = 1;

    operationHistory.forEach((value, index, opHistory) => {

        switch (value) {
            case OPERATION.PLUS:
                if (isEmpty(opHistory[index + 1])) {
                    throw new Error("Missing operands")
                } else {
                    operationResult += Number(opHistory[index + 1]);
                }

                break;

            case OPERATION.MINUS:

                if (isEmpty(opHistory[index + 1])) {
                    throw new Error("Missing operands")
                } else {
                    operationResult -= Number(opHistory[index + 1]);
                }

                break;

            case OPERATION.MULTIPLY:
                if (isEmpty(opHistory[index + 1])) {
                    throw new Error("Missing operands")
                } else {
                    operationResult *= Number(opHistory[index + 1])
                }

                break;

            case OPERATION.DIVIDE:
                if (Number(opHistory[index + 1]) === 0 || Number(opHistory[index + 1]) === -0) {
                    throw new Error("Cannot divide by zero")
                }

                operationResult /= Number(opHistory[index + 1])

                break;

            case OPERATION.PERCENT:
                if (isEmpty(opHistory[index + 1])) {
                    throw new Error("Missing operands")
                } else {
                    operationResult *= (opHistory[index + 1] / 100)
                }

                break;

            default:
                if (index === 0) {
                    operationResult = Number(value)
                }

        }
    })

    const fractionalPart = Math.abs(operationResult - Math.floor(operationResult))

    if (fractionalPart !== 0.5) {
        precisionDigits = 4
    }

    return Number.isInteger(operationResult) ? operationResult : Number(operationResult).toFixed(precisionDigits)
}