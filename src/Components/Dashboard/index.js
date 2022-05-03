import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import AddTaskPopUp from './modal';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardActions } from '../Action/dashboard.action';
import EditIcon from '@mui/icons-material/Edit';
import validateInput from './validateInput';
import { display } from '@mui/system';


// const itemsFromBackend = [
//   { id: uuidv4(), content: "First task" },
//   { id: uuidv4(), content: "Second task" },
//   { id: uuidv4(), content: "Third task" },
//   { id: uuidv4(), content: "Fourth task" },
//   { id: uuidv4(), content: "Fifth task" }
// ];



function DashBoard(props) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState([]);
  const [errors,setErrors] = useState({});
  const tasks = state && state.dashboard && state.dashboard.taskList

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // let filterData = columns[result.destination.droppableId].findIndex(e)
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      let destItemStatus = destItems && destItems[0].status;
      let removedData;
      if(destItemStatus)  {
        destItems.splice(destination.index, 0, {...removed,status:destItemStatus});
        removedData = {...removed,status:destItemStatus}
      }
      else {
        destItems.splice(destination.index, 0, removed);
        removedData = {...removed}
      }
     
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      // let removedData = {...removed,status:destination.index === 0? "Todo": (destination.index === 1? 'running': 'Done')}
      // let index = taskList.findIndex(ele => ele.name ===removedData.name);
      handleUpdate(removedData);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
  

  const columnsFromBackend = {

    [uuidv4()]: {
      name: "To do",
      items: taskList
    },
    [uuidv4()]: {
      name: "Doing",
      items: []
    },
    [uuidv4()]: {
      name: "Done",
      items: []
    }
  };


  const [columns, setColumns] = useState(columnsFromBackend);
  const [values, setValues] = useState({ id: uuidv4(), title: '', assignee: '', deadline: null, status: null, isAdded: false });

  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks])

  useEffect(() => {
    setColumns({
      [uuidv4()]: {
        name: "To do",
        items: taskList.filter(ele => ele.status === 'Todo')
      },
      [uuidv4()]: {
        name: "Doing",
        items: taskList.filter(ele => ele.status === 'running')
      },
      [uuidv4()]: {
        name: "Done",
        items: taskList.filter(ele => ele.status === 'Done')
      }

    })

  }, [taskList])


  const handleShowModal = (isTrue = false) => {
    if (isTrue === false) {
      setValues({ id: uuidv4(), title: '', assignee: '', deadline: null, status: null, isAdded: false })
    }
    setIsOpen(!modalIsOpen);
  }
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = () => {
    let validationError = validateInput(values);
    if(Object.keys(validationError).length === 0) {
    let payload = { ...values, isAdded: true };
    dispatch(dashboardActions.addTask(payload));
    setValues({ id: uuidv4(), title: '', assignee: '', deadline: null, status: null, isAdded: false })
    handleShowModal();
    }
    else {
      setErrors
      (validationError)
      // alert("Please enter valid valid!")

    }
  }

  const handleEdit = (editData) => {
    setValues(editData);
    handleShowModal(true);
  }

  const handleUpdate = (removedData) => {
   
    let validationError = validateInput(values);
    if(removedData && removedData.id) {
      validationError = {};
    }
    if(Object.keys(validationError).length === 0) {
    let payload = { ...values, isAdded: true };
    dispatch(dashboardActions.updateTask(removedData && removedData.id ? removedData : payload));
    setValues({ id: uuidv4(), title: '', assignee: '', deadline: null, status: null, isAdded: false })
    if(! (removedData && removedData.id)) {
    handleShowModal();
    }
    }
    else {
      setErrors
      (validationError)
      // alert("Please enter valid valid!")
    }
  }
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <AddTaskPopUp
          values={values}
          errors = {errors}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          modalIsOpen={modalIsOpen}
          openModal={handleShowModal} />
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index1) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >

                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            borderRadius:'5px',
                            textAlign:'center'
                          }}
                        >
                          <h2>{column.name}</h2>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "28px",
                                        display:'flex',
                                        backgroundColor: snapshot.isDragging
                                          ? "#fff"
                                          : "#fff",
                                          borderRadius:'4px',
                                        // color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                     <div style={{width:'70%'}}>{item.title}</div> 
                                     <div style={{width:'30%'}}> <EditIcon color='primary' onClick={() => handleEdit(item)} style={{ marginLeft: 50 }} />
                                     </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                          {<h4 onClick={() => handleShowModal(false)} style={{ cursor: 'pointer' }}>Add a Task...</h4>}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}

        </DragDropContext>
      </div>
    </div>
  );
}

export default DashBoard;