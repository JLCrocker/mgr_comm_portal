import supabase from './supabase';

export async function submitIlog(newIlog) {
  const { userId, employeeId, date, incident, actionTaken, comments } = newIlog;
  const { error } = await supabase.from('incident_logs').insert([
    {
      user_reporting: userId,
      employee: employeeId,
      date: date,
      incident: incident,
      action: actionTaken,
      comments: comments,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error('Employees could not be loaded');
  }
}

export async function getILogs() {
  const { data, error } = await supabase
    .from('incident_logs')
    .select(
      'id, date, user_reporting, incident, action, comments, employee, employees(id, first_name, last_name)'
    )
    .order('employee', { ascending: true })
    .order('date', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('iLogs could not be loaded');
  }
  return data;
}

export async function getILogsByNameAndDate(employeeId, startDate, endDate) {
  const { data, error } = await supabase
    .from('incident_logs')
    .select(
      'id, date, user_reporting, incident, action, comments, employee, employees(id, first_name, last_name)'
    )
    .gte('date', startDate)
    .lte('date', endDate)
    // .eq('employee', employeeId)
    .order('employee', { ascending: true })
    .order('date', { ascending: true })
    .or(`employee.eq.${employeeId}`);

  if (error) {
    // console.error(error);
    // throw new Error('iLogs could not be loaded');
  }
  return data;
}
