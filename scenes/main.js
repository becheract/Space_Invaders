//speed of player 
const move_speed = 200
//speed of invaders
const spaceSpeed = 100
let currentSpeed = spaceSpeed
const level_down = 100

const bullet_speed = 400

const time_Left = 30

layer(['obj', 'ui'], 'obj')

//create map 
addLevel([
  //! --> left wall | ^ --> space invaders | & --> is the right wall
  '!^^^^^^^^^^.     &',
  '!^^^^^^^^^^.     &',
  '!^^^^^^^^^^.     &',
  '!^^^^^^^^^^.     &',
  '!^^^^^^^^^^.     &',
  '!^^^^^^^^^^.     &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
], {
  width: 30, 
  height: 22,
  //assigning the specified sprites 
  '^' : [sprite('space_invader'), 'space-invader' ],
  '!' : [sprite('wall'), 'left-wall'],
  '&' : [sprite('wall'), 'right-wall'],
})

//player
const player = add([
  sprite('player'),
  pos(width() / 2, height() / 2),
  origin('center')
])



//movement for player
keyDown('left', () => {
  player.move(-move_speed, 0)
})

keyDown('right', () => {
  player.move(move_speed, 0)
})

function spawnBullet(p){
  add([rect(6,18), 
  pos(p), 
  origin('center'), 
  color(255,0,0),
  'bullet'
  ])
}

//bullets
keyPress('space', () => {
spawnBullet(player.pos.add(0,-25))
}) 

//move bullets 
action('bullet', (b) => {
  b.move(0,-bullet_speed)
  if(b.pos.y < 0){
    destroy(b)
  }
})

collides('bullet', 'space-invader', (b,s) => {
  camShake(4)
  destroy(b)
  destroy(s)
  score.value++
  score.text = score.value
})

//keep track of score and assign it to the layer
const score = add([
  text('0'),
  pos(50,50),
  layer('ui'),
  scale(2),
  {
    value:0,
  }
])

//time left 
const timer = add([
  text('0'), 
  pos(100,50),
  scale(2),
  layer('ui'),
  {
    time: time_Left
  }
])

//get called every frame
timer.action(() => {
  timer.time -= dt()
  timer.text = timer.time.toFixed(2)
  //when timer reaches 0 then...
  if(timer.time <= 0){
    go('lose', { score: score.value})
  }
})


//move space invaders 
action('space-invader', (s) => {
  s.move(currentSpeed, 0)
})

collides('space-invader', 'right-wall', () => {
  currentSpeed = -spaceSpeed 
  every('space-invader', (s) => {
    s.move(0,level_down)
  })
})

collides('space-invader', 'left-wall', () => {
  currentSpeed = spaceSpeed 
  every('space-invader', (s) => {
    s.move(0,level_down)
  })
})

//when player collides with enemy 
player.overlaps('space-invader', () => {
  go('lose', { score: score.value })
})

action('space-invader', (s) => {
  if(s.pos.y >= (height()/2)) {
    go('lose', { score: score.value})
  }
})
