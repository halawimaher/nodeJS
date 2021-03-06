
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
  else if(text === 'check\n' || text.startsWith('check ')){
    check(text);
  }
  else if(text === 'uncheck\n' || text.startsWith('uncheck ')){
    unCheck(text);
  }
  else if(text.startsWith('add ')){
    add(text);
  }
  else if(text === 'remove\n' || text.startsWith('remove ')){
    remove(text);
  }
  else if(text === "load\n"){
    load();
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'clear\n'){
    clear();
  }
  else{
    unknownCommand(text);
  }
}
const { clear } = require('console');
// json.parse/readfile/try-catch for empty files error
/*Define global variable*/
const fs = require('fs');
let newList;
let file;
if(process.argv[2]){
  file = process.argv[2]
}
else{
  file = 'database.json'
}
try {
    newList = fs.readFileSync(file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
  });
} catch (error) {
  newList = [];
}
if(newList.length > 0){newList = JSON.parse(newList)}


// for(let i=0; i <newList.length; i++){
//   if(newList[i].done == true){
//     newList[i].done = '[✓]'
//   }
//   else{
//     newList[i].done = '[ ]'
//   }
// }

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

/**
 * Lists current tasks.
 *
 * @returns {void}
 */
function list(newList){
  if(newList.length == 0){
    console.log("No tasks to show")
    return
  }
  for(let i=0; i <newList.length; i++){
    if(newList[i].done == false){newList[i].done = '[ ]'}
    console.log(newList[i].done, newList[i].name)
  }
  console.log("Type check/uncheck number_of_task to mark as complete/incomplete")
}

/**
 * Add tasks.
 *
 * @returns {void}
 */
function add(text){
  let b = {"done": false, "name": text.replace('add ', "").trim()}
  newList.push(b);
  console.log("New task added. Type \'list\' to see your tasks.")
}

/**
 * Marks tasks as complete.
 *
 * @returns {void}
 */
function check(text){
  if(text === 'check\n'){
    console.log("Error. Please specify task number to mark as checked!")
  }
  else{
    let v = text.split(" ")
    let y = parseInt(v[1])
    tempList = newList
    let checker = tempList[0].done
    if(y > newList.length){
      console.log("error")
      return
    }
    if(checker = '[ ]'){
      newList[y-1].done = '[✓]';
      console.log("Task " + y + " marked as complete!")
    }
    else{console.log("You're already done with that one!")}
  }
}

/**
 * Marks tasks as incomplete.
 *
 * @returns {void}
 */
function unCheck(text){
  if(text === 'uncheck\n'){
    console.log("Error. Please specify task number to mark as unchecked!")
  }
  else{
    let v = text.split(" ")
    let y = parseInt(v[1])
    if(y > newList.length){
      console.log("error")
      return
    }
    let checker = newList[y-1].done
    if(checker = '[✓]'){newList[y-1].done = '[ ]', console.log("Task " + y + " marked as Incomplete!")}
    else{console.log("Nothing to do. Get a move on")} 
  }}

/**
 * Deletes from the tasks list.
 *
 * @returns {void}
 */
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

/**
 * Edits the task list.
 *
 * @returns {void}
 */
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
  fs.writeFile(file, JSON.stringify(newList, null, 1) ,'utf8', function (err) {
    if (err) throw err;
    console.log('\x1b[36m Saving and Quitting now, goodbye!', "\x1b[0m")
    process.exit();
  });
}

/**
 * Lists all commands
 *
 * @returns {void}
 */
function help(){
  console.log('Type \'hello\' to say Hello!')
  console.log('Type hello + your name to say Hello + name')
  console.log('Type \'list\' to see to-do list')
  console.log('Type \'add + "entry"\' to add "entry" to list')
  console.log('Type \'remove\' to remove first entry from list')
  console.log('Type \'remove(n)\' to remove "nth" entry from list')
  console.log('Type \'quit\' or \'exit\' to see additional commands!')
  console.log('Type \'edit name_of_task\' to replace last task with name_of_task!')
  console.log('Type \'edit 2 name_of_task\' to replace second task with name_of_task!')
  console.log('Type check 2 to mark second task as complete!')
  console.log('Type uncheck 3 to mark third task as incomplete!')
}
// The following line starts the application
startApp("Maher Halawi")
