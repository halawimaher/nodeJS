
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
    list();
  }
  else if(text === 'add\n'){
    console.log('Cannot add empty fields');
  }
  else if(text.startsWith('add ')){
    add(text);
  }
  else if(text === 'remove\n'){
    remove(text);
  }
  else if(text.startsWith('remove ')){
    removeSelected(text);
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
  var newList = ['Take out the trash',
                 'Wash the car',
                 'Clean the dishes',
                 'Mow the lawn'];
  function list(){
    console.log(newList)
} 

  function add(text){
    newList.push(text.substring(4).replace("\n", ""));
}
  function remove(){
    newList.pop();
}
function removeSelected(text){
  let num = text.split(' ');
  newList.splice(num[1]+1, 1);
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
}
// The following line starts the application
startApp("Maher Halawi")
