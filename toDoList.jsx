/*
    https://egghead.io/lessons/react-redux-writing-a-todo-list-reducer-adding-a-todo
 */

// a reducer is a pure function you write to implement the update logic of your application -- that is, how the next state is calculated given the current state and the action being dispatched.

const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ];
      default:
        return state;
    }
  };
  
  // Before writing a reducer, write a test to know whether code is correct.
  const testAddTodo = () => {
    // stateBefore variable is an empty Array  
    const stateBefore = [];
    // action which will be dispatched.  
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
    };
    // the state I expect to get after calling the Reducer.
    const stateAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false // an additonal field that i want to be initialized as 'false'
      }
    ];
    // Ensure the reducer is a pure function, so call deepFreeze library on both 'stateBefore' + 'action'
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    // use 'expect' library to verify that todo reducer with 'stateBefore' + 'action' object will render result that is deeply equal to 'stateAfter'
    expect(
      todos(stateBefore, action)
    ).toEqual(stateAfter);
  };
  
  testAddTodo();
  console.log('All tests passed.') || displayInPreview('All tests passed.');
  
  
  
  
  // display in plunker preview
  function displayInPreview(string) {
    var newDiv = document.createElement("div"); 
    var newContent = document.createTextNode(string); 
    newDiv.appendChild(newContent);
    document.body.appendChild(newDiv)
  }
  
  // Function exported from deep-freeze lib
  function deepFreeze (o) {
    if (o===Object(o)) {
      Object.isFrozen(o) || Object.freeze(o)
      Object.getOwnPropertyNames(o).forEach(function (prop) {
        prop==='constructor'||deepFreeze(o[prop])
      })
    }
    return o
  }