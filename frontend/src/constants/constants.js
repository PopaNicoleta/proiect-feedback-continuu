import smiley from "../assets/smiley.png"
import frowny from "../assets/frowny.png"
import surprised from "../assets/surprised.png"
import confused from "../assets/confused.png"

const emojis = [
    { id: 1, img: smiley, label: 'smiley' },
    { id: 2, img: frowny, label: 'frowny' },
    { id: 3, img: surprised, label: 'surprised' },
    { id: 4, img: confused, label: 'confused' },
];

const emojiToImg = {
    smiley,
    frowny,
    surprised,
    confused
}

export {
    emojis,
    emojiToImg
}