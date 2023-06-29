import http from '../http-common';

const findAllHolidays = () => {
    const userToken = localStorage.getItem('userToken')
    return http.get(`/project/all-project`, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}



const addNewProject = (project_name, description, hours, assign_to, created_by) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/add-project`, {project_name, description, hours, assign_to, created_by}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const updateProject  = (_id, project_name, description, hours, assign_to, status) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/update-project`, {_id, project_name, description, hours, assign_to, status}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const deleteProjectFile = (_id, fileName, fileId) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/delete-projectfile`, {_id, fileName, fileId}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}



const addNewTask = (task_name, description , task_hours, task_note, due_date, assign_to, assign_by, project_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/add-task`, {task_name, description , task_hours, task_note, due_date, assign_to, assign_by, project_id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const updateTask =  (task_name, description , task_hours, task_note, due_date, assign_to, update_by, _id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/update-task`, {task_name, description , task_hours, task_note, due_date, assign_to, update_by, _id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const updateTaskStatus =  (_id, status) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/update-taskstatus`, {_id, status}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const deleteTaskFile = (_id, fileName, fileId) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/delete-taskfile`, {_id, fileName, fileId}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const findTaskbyEmpId = (employee_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/find-task-empid`, {employee_id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const findProjectbyId = (_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/find-project-byid`, {_id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const findTaskbyProjectId = (_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/find-taskby-projectid`, {_id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const findTaskbyTaskId = (_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/find-taskbyid`, {_id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}


const AddTaskNote = (task_note, task_id, added_by) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/add-tasknote`, {task_note, task_id, added_by}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}


const findTaskNotesbyTaskId = (_id, limit) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/find-tasknote-bytaskid`, {_id, limit}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const updateTaskNote = (_id, task_note) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/update-tasknote`, {_id, task_note}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}

const deleteTaskNote = (_id) => {
    const userToken = localStorage.getItem('userToken')
    return http.post(`/project/delete-tasknote`, {_id}, {headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      }});
}


const ProjectService = {
    findAllHolidays,
    addNewProject,
    updateProject,
    deleteProjectFile,
    addNewTask,
    updateTask,
    deleteTaskFile,
    updateTaskStatus,
    findTaskbyEmpId,
    findProjectbyId,
    findTaskbyProjectId,
    findTaskbyTaskId,
    AddTaskNote,
    findTaskNotesbyTaskId,
    updateTaskNote,
    deleteTaskNote
};

export default ProjectService;