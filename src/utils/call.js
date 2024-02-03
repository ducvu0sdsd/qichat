export const handleResizeScreenByNumberOfParticipants = (num) => {
    if (num === 1)
        return 1
    if (num === 2)
        return 2
    return 3
}