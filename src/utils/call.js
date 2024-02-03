export const handleResizeScreenByNumberOfParticipants = (num) => {
    if (num === 1)
        return '1fr'
    if (num === 2)
        return '1fr 1fr'
    return '1fr 1fr 1fr'
}