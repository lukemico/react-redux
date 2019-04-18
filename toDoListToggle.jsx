/*
 https://egghead.io/lessons/react-redux-writing-a-todo-list-reducer-toggling-a-todo
 */

 // this is the Reducer function. The Reducer must be a pure function.
const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':                      // implement an action 'ADD_TODO'
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ];
      case 'TOGGLE_TODO':                   // implement an action 'TOGGLE_TODO'
        return state.map(todo => {
          if (todo.id !== action.id) {
            return todo;
          }
  
          return {
            ...todo,
            completed: !todo.completed
          };
        });
      default:
        return state;
    }
  };
  
  const testAddTodo = () => {
    const stateBefore = [];
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
    };
    const stateAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      }
    ];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(
      todos(stateBefore, action)
    ).toEqual(stateAfter);
  };
  
  const testToggleTodo = () => {
    const stateBefore = [
      {
        id: 0,                      // unique id is set.
        text: 'Learn Redux',
        completed: false            // completed: is set to 'false'
      },
      {
        id: 1,                      // unique id is set.
        text: 'Go shopping',
        completed: false            // completed: is set to 'false'
      }
    ];
    const action = {                // here, I declare the 'action' for 'TOGGLE_TODO'
      type: 'TOGGLE_TODO',
      id: 1
    };
    const stateAfter = [            // Here , I declare the 'stateAfter' state after calling the reducer. 
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: true             // completed: is set to 'true' for 'stateAfter'
      }
    ];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(
      todos(stateBefore, action)
    ).toEqual(stateAfter);
  };
  
  
  testAddTodo();
  testToggleTodo();
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