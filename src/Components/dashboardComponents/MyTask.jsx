
// // import React, { useEffect, useState } from 'react';
// // import { Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap'; 

// // const getDaysAgo = (date) => {
// //   const today = new Date();
// //   const taskDate = new Date(date);
// //   const diffTime = Math.abs(today - taskDate);
// //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// //   return diffDays;
// // };


// // const dummydata=[
// //     { id: 1, text: 'Complete project documentation', completed: false, createdAt: new Date() - 3 * 24 * 60 * 60 * 1000 },
// //     { id: 2, text: 'Update project repository', completed: false, createdAt: new Date() - 1 * 24 * 60 * 60 * 1000 },
// //     { id: 3, text: 'Prepare for client meeting', completed: false, createdAt: new Date() - 5 * 24 * 60 * 60 * 1000 },
// //     { id: 4, text: 'Prepare for client meeting', completed: false, createdAt: new Date() - 5 * 24 * 60 * 60 * 1000 },
// //     { id: 4, text: 'Prepare for client meeting', completed: false, createdAt: new Date() - 5 * 24 * 60 * 60 * 1000 },
// // ]

// // const TodoList = () => {
// //   const [tasks, setTasks] = useState([]);


// //   useEffect(() => {
// //     // Simulate fetching data
// //     const fetchdata = () => {

// //     //     fetch('/api/menu-items')
// //     //   .then(response => response.json())
// //     //   .then(data => {
// //     //     setMenuItems(data);
        
// //     //   })
// //     //   .catch(() => {
        
// //     //     // Handle error
// //     //   });


// //       setTimeout(() => {
// //         setTasks(dummydata);
        
// //       }, 100);
// //     };

// //     fetchdata();
// //   }, []);
  

// //   const toggleTaskCompletion = (id) => {
// //     setTasks(tasks.map(task =>
// //       task.id === id ? { ...task, completed: !task.completed } : task
// //     ));
// //   };

// //   const addTask = (text) => {
// //     const newTask = {
// //       id: tasks.length + 1,
// //       text,
// //       completed: false,
// //       createdAt: new Date()
// //     };
// //     setTasks([...tasks, newTask]);
// //   };

// //   const handleAddTask = () => {
// //     const taskText = prompt('Enter new task:');
// //     if (taskText) addTask(taskText);
// //   };

// //   return (
// //     <div className='todo-list-container'>
// //       <div className='header '>
// //         <h3>My Tasks</h3>
// //         <Button variant='primary' onClick={handleAddTask}>Add Task</Button>
// //       </div>
// //       <ListGroup>
// //         {tasks.map(task => (
// //           <ListGroupItem key={task.id} className='d-flex align-items-center mt-2'>
// //             <Form.Check 
// //               type='checkbox'
// //               id={`task-${task.id}`}
// //               checked={task.completed}
// //               onChange={() => toggleTaskCompletion(task.id)}
// //               className='me-2 ms-2 border-dark'

// //             />
// //             <div className={task.completed ? 'completed' : ''}>
// //               {task.text}
// //               <small className='d-block'>{getDaysAgo(task.createdAt)} days ago</small>
// //             </div>
// //           </ListGroupItem>
// //         ))}
// //       </ListGroup>
// //     </div>
// //   );
// // };

// // export default TodoList;



// import React, { useEffect, useState } from 'react';
// import { Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap';

// const getDaysAgo = (date) => {
//   const today = new Date();
//   const taskDate = new Date(date);
//   const diffTime = Math.abs(today - taskDate);
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays;
// };

// const dummydata = [
//   { id: 1, text: 'Complete project documentation', completed: false, createdAt: new Date() - 3 * 24 * 60 * 60 * 1000 },
//   { id: 2, text: 'Update project repository', completed: false, createdAt: new Date() - 1 * 24 * 60 * 60 * 1000 },
//   { id: 3, text: 'Prepare for client meeting', completed: false, createdAt: new Date() - 5 * 24 * 60 * 60 * 1000 },
//   { id: 4, text: 'Submit project report', completed: false, createdAt: new Date() - 2 * 24 * 60 * 60 * 1000 },
//   { id: 5, text: 'Review code', completed: false, createdAt: new Date() - 1 * 24 * 60 * 60 * 1000 },
// ];

// const MyTask = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data
//     const fetchdata = () => {
//       setTimeout(() => {
//         setTasks(dummydata);
//       }, 100);
//     };

//     fetchdata();
//   }, []);

//   const toggleTaskCompletion = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const addTask = (text) => {
//     const newTask = {
//       id: tasks.length + 1,
//       text,
//       completed: false,
//       createdAt: new Date()
//     };
//     setTasks([...tasks, newTask]);
//   };

//   const handleAddTask = () => {
//     const taskText = prompt('Enter new task:');
//     if (taskText) addTask(taskText);
//   };

//   return (
//     <div className='todo-list-container'>
//       <div className='header'>
//         <h3>My Tasks</h3>
//         <Button variant='primary' onClick={handleAddTask}>Add Task</Button>
//       </div>
//       <ListGroup style={{ maxHeight: '350px', overflowY: 'auto' }}>
//         {tasks.map(task => (
//           <ListGroupItem key={task.id} className='d-flex align-items-center mt-2'>
//             <Form.Check
//               type='checkbox'
//               id={`task-${task.id}`}
//               checked={task.completed}
//               onChange={() => toggleTaskCompletion(task.id)}
//               className='me-2 ms-2 border-dark'
//             />
//             <div className={task.completed ? 'completed' : ''}>
//               {task.text}
//               <small className='d-block'>{getDaysAgo(task.createdAt)} days ago</small>
//             </div>
//           </ListGroupItem>
//         ))}
//       </ListGroup>
//     </div>
//   );
// };

// export default MyTask;
