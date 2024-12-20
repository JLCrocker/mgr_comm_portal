import supabase from './supabase';

export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('id, completed, taskDoc, tags, assignmentName, taskNotes, dueDate')
    .order('completed')
    .order('dueDate', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Tasks could not be loaded.');
  }

  return data;
}

export async function submitTasks(newTask) {
  const {
    taskDescription,
    taskTags,
    taskAssignment,
    taskNotes,
    dueDate: taskDueDate,
  } = newTask;
  const { error } = await supabase
    .from('tasks')
    .insert([
      {
        completed: false,
        taskDoc: taskDescription,
        tags: taskTags,
        assignmentName: taskAssignment,
        taskNotes: taskNotes,
        dueDate: taskDueDate,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Tasks could not be loaded.');
  }
}

export async function toggleTaskComplete(id, completed) {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: !completed })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Tasks could not be loaded.');
  }
}

export async function deleteTask(id) {
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Tasks could not be loaded.');
  }
}
