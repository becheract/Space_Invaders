//speed of player 
const move_spped = 200

//create map 
addLevel([
  //! --> left wall | ^ --> space invaders | & --> is the right wall
  '!^^^^^^^^^^.     &',
  '!^^^^^^^^^^.     &',
  '!^^^^^^^^^^.     &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
], {
  width: 30, 
  height: 22,
  //assigning the specified sprites 
  '^' : [sprite('space_invader') ],
  '!' : [sprite('wall'), 'left-wall'],
  '&' : [sprite('wall'), 'right-wall'],
})

//player
const player = add([
  sprite('player'),
  pos(width() / 2, height() / 2),
  origin('center')
])

//speed of player 
const move_spped = 200

//movement for player
keyDown('left', () => {
  player.move(-move_spped, 0)
})

keyDown('right', () => {
  player.move(move_spped, 0)
})