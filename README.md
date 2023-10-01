# Crystal-Clear-Game

 ## What it is
Crystal Clear is a simple memory game based on the popular 'Simon' colour sequence game. Upon initiation the user is shown one random color which they have to re-input with a mouse click. 
They have then cleared the level and the sequence repeats with an additional color at the end this time. With each level passed, the sequence is incremented, each time requiring the user to re-input
the sequence from start to finish. Upon failing to register a correct input in the sequence, the game is over and they must start again.

## What is completed so far
As of right now the game contains all of its core funcionality to be played, additionally the themes are functional and can be clicked in the shop to apply them.

## What needs to be done
1. There is currently no functionality in the currency counter, this needs to be given the js to update whenever a game is completed with a magnitude equivalent to the number of levels the player managed to achieve.
2. As of right now the 'shop' menu does not have any purchase function on the themes and lets anyone apply them as and when. This needs to be linked to the currency counter in a way that until sufficient currency
is attained, the themes are locked, and once it is attained the player can click the theme to unlock it and the users currency is adjusted accordingly. 
3. Likely a verys simple fix, the disableUI() function is currently not inhibiting input during the sequence animation for the levels, making it possible to accidentally press a key when the sequence is playing out
and losing the game. Inputs should only be allowed in the window between sequence animations.
4. Implement a way to save progress locally, maybe there is something that can be done with cookies, or a simple login screen so you can access your themes if you had previously unlocked them before.
