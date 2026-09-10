import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const NOVALUE = Number.NEGATIVE_INFINITY
  const [list, updateList] = useState([]);
  const [editingIndex, updateEditingIndex] = useState(NOVALUE);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    if (inputRef.current?.value) {
      const text = inputRef.current.value;
      const item = {
        completed: false,
        text: text
      }
      updateList([...list, item]);
      inputRef.current.value = "";
    }
  }

  const handleItemCheck = (index: number) => {
    const newList = [...list];
    newList[index].completed = !newList[index].completed;
    updateList(newList)
    console.log(newList[index].completed);
  }
  
  const handleRemoveClick = (index: number) => {
    const newList = [...list];
    if (index === editingIndex) {
      updateEditingIndex(NOVALUE);
    }
    newList.splice(index, 1)
    updateList(newList)
    console.log("Index is " + index)
  }

  const handleEditClick = (index: number) => {
    // const newList = [...list];
    // Add an input element instead with an reference to it, 
    // then update the list and await enter/cancel command
    // 
    // console.log(newList[index])
    // Scratch that, update editingIndex to be current index
    // so that next index renders an input
    // ...and maybe useEffect to focus on it (later)
    updateEditingIndex(index);
  }

  const handleSaveClick = () => {
    updateEditingIndex(NOVALUE)
  }

  const handleEditInput = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Enable editing...somehow");
    const newList = [...list];
    newList[index].text = event.target.value;
    updateList(newList);
  }
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  return (
    <>
      <main>
        <div className="container">
          <h1>Todo List</h1>
          <div className="ul-container">
            <ul>
              {/* If editing state, render input and focus on it, else render normal list item */}
              {list.map( ({completed, text}, index) => {
                return (
                <div className='li-container'>
                  {editingIndex === index? 
                  <>
                  <li key={"list-item"+index} ><input value={text} onChange={(e) => handleEditInput(index, e)}></input></li>
                  <span key={"edit"+index} onClick={handleSaveClick}>💾</span> 
                  </>:
                  <>
                  <li key={"list-item"+index} className={completed? "checked": ""} onClick={() => handleItemCheck(index)}>{text}</li>
                  <span key={"edit"+index} onClick={() => handleEditClick(index)}>✒️</span>
                  </>
                  }
                  <span key={"remove"+index} onClick={() => handleRemoveClick(index)}>❌</span>
                </div>
                )
              })}
            </ul>
          </div>
          <div className="input">
            <input ref={inputRef} placeholder='Enter Task...' onKeyDown={(e) => {if (e.key === 'Enter'){handleAddClick()}}}/>
            <button onClick={handleAddClick}>Add</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
