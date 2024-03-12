export function shuffleArray(array) {
    for (let i = array?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export const checkBlock = (currentUser, user) => {
    if (currentUser.friends.map(item => item._id).includes(user._id) && user.friends.map(item => item._id).includes(currentUser._id)) {
        if (currentUser.friends.filter(item => item._id === user._id)[0].block === true)
            return `You has blocked ${user.fullName}`
        if (user.friends.filter(item => item._id === currentUser._id)[0].block === true)
            return `${user.fullName} has blocked you`
    }
    return null
}
