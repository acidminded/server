const Discord = require('discord.js');
const { prefix, token } = require ('./config.json')
const client = new Discord.Client();
var users= []
var ping= []
var count = 0
var countgame = 0
var index = null
var xrandomindex= []
var msg= 0


//copy/pasted shuffle array function, used to make one random index
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // Continue to shuffle while there are items on the index
  while (0 !== currentIndex) {

    // Pick one of the remaining elements
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

client.once('ready', () => {
    console.log('Ready!')
})
//%q
client.on('message', message => {
     if(message.content.startsWith(`${prefix}q`))        
        if (ping.includes(message.author))
         message.channel.send("You are already in the queue!")
        else 
        { users[0 + count] = message.author
         ping[0 + count] = message.author
         count = count + 1
         message.channel.send("You have been added the the queue.") } 
// %r
     else if(message.content.startsWith(`${prefix}r`))
         if (ping.includes(message.author)) {
            index = ping.indexOf(message.author);
            if (index > -1) {
              users.splice(index, 1)
              ping.splice(index, 1);
            }
            message.channel.send("You have been removed from the queue.") 
            count = count - 1}
         else message.channel.send("You are not in the queue!")
// %n        
     else if(message.content.startsWith(`${prefix}n`))   
     //play game if more than two people 
        if (count > 1)
            {if (countgame == count -1 ) {
              message.channel.send("The queue is being shuffled.")
                const arr = [users];
                shuffle(arr);
                console.log(arr);
              countgame = 0 } 
          message.channel.send ((ping)[countgame] + " is currently asking " + (ping)[countgame + 1] )
          countgame = countgame +1
          msg = count - countgame 
        }
     else message.channel.send("Too few players to start the game.")
//%s
     else if(message.content.startsWith(`${prefix}s`))    
     {  if (count > 1) {
         if (message.author == (ping)[countgame]) {
         message.channel.send((users)[countgame + 1] + " has been removed")
         users.splice(countgame + 1, 1)
         ping.splice(countgame+ 1, 1)
         count = count -1 }
         else {
         message.channel.send((users)[countgame] + " has been removed.") 
         users.splice(countgame,1)
         ping.splice(countgame,1)
         count = count -1 }
         //entire !n command again (following !s)
         if (count > 1) {
            if (countgame == count -1 ) {
                message.channel.send("The queue is being shuffled.")
                const arr = [users];
                shuffle(arr);
                console.log(arr);
                countgame = 0 }
                message.channel.send ((ping)[countgame] + " is currently asking " + (ping)[countgame + 1] )
                countgame = countgame +1
                msg = count - countgame
            }
         else message.channel.send("Too few players to start the game.") }
         else message.channel.send("Too few players to start the game.")  
        }
//%d
     else if(message.content.startsWith(`${prefix}d`))     
     {message.channel.send("**The current queue is:**")
      message.channel.send(users) 
      message.channel.send(count + " Players currently in queue.\n " + msg + "T/D Remaining untill next randomization.")
    }
//%bug
      else if(message.content.startsWith(`${prefix}bug`)) 
      {message.channel.send("%q")
        }
//%p       
      else if(message.content.startsWith(`${prefix}p`)) 
        {message.channel.send("**The queue has been purged.**")        
        users = []
        ping = [] 
        count = 0
        msg = 0
      }
})

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
