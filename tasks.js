
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === 'hello\n' || text.startsWith('hello ')){
    hello(text);
  }
  else if(text === 'list\n'){
    list(newList);
  }
  else if(text === 'edit\n' || text.startsWith('edit')){
    edit(text);
  }
  else if(text === 'add\n'){
    console.log('Cannot add empty fields');
  }
  else if(text.startsWith('add ')){
    add(text);
  }
  else if(text === 'remove\n' || text.startsWith('remove ')){
    remove(text);
  }
  else if(text === 'help\n'){
    help();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(myName){
    if (myName === 'hello\n'){console.log('hello!')}
    else{
      console.log('' + myName.replace("\n", "") + "!")
    }
  }
  var newList = [
                  {"done": false, "name": 'Take out the trash'},
                  {"done": false, "name": 'Wash the car'},
                  {"done": false, "name": 'Clean the dishes'},
                  {"done": false, "name": 'Mow the lawn'}
                ];

  function list(newList){
    for(let i=0; i <newList.length; i++){
      if(newList[i].done == true){
        newList[i].done = '[✓]'
      }
      else{
        newList[i].done = '[ ]'
      }
      console.log(newList[i].done, newList[i].name)
    }
} 

  function add(text){
    let b = {"done": false, "name": text.replace('add ', "")}
    newList.push(b);
}
  function remove(text){
    text = text.trim();
    if(text.length == 6){newList.pop()}
    else{
      let num = text.split(' ');
      var c = parseInt(num[1]-1);
      if(c < 0 || c >= newList.length){
        console.log('entry doesn\'t exist')
      }
      else{
      x = newList.splice(c, 1);
      for(let i=0; i <newList.length; i++){
        if(newList[i].done == true){
          newList[i].done = '[✓]'
        }
        else{
          newList[i].done = '[ ]'
        }
        console.log(newList[i].done, newList[i].name)
      }
    }
  }  
}

function edit(text){
  let test = text.split(" ");
  test.shift();
  let a = test[0];
  if (text === "edit\n"){
    console.log("Error, type \'help\' for additional commands");
  }
  else{
    let final = test.join(" ").replace("\n","")
    if(isNaN(a)){
      let b = {"done": false, "name": text.replace('edit ', "")}
      newList.pop()
      newList.push(b)
    }
    else{
      let b = parseInt(a)
      let temp = final.split(" ")
      temp2 = temp.shift();
      temp = temp.join(" ")
      console.log(temp)
      let final2 = {"done": false, "name": temp};
      newList[b-1] = final2;
    }
  }

}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * Lists all commands
 *
 * @returns {void}
 */
function help(){
  console.log('Type \'hello\' to say Hello!')
  console.log('Type \'list\' to see to-do list')
  console.log('Type \'add + "entry"\' to add "entry" to list')
  console.log('Type \'remove\' to remove first entry from list')
  console.log('Type \'remove(n)\' to remove "nth" entry from list')
  console.log('Type hello + your name to say Hello + name')
  console.log('Type \'quit\' or \'exit\' to see additional commands!')
  console.log('Type \'edit name_of_task\' to replace last task with name_of_task!')
  console.log('Type \'edit 2 name_of_task\' to replace second task with name_of_task!')
}
// The following line starts the application
startApp("Maher Halawi")
