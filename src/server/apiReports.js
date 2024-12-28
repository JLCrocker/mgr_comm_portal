import supabase from './supabase.js';

function formatDate(date) {
  const convertedDateValue = new Date(date).toISOString().slice(0, 10);
  return convertedDateValue;
}

export async function getReports() {
  // const convertedDateValue = new Date(dateValue).toISOString().slice(0, 10);
  // console.log(`Converted Date Value: ${convertedDateValue}`);
  const { data, error } = await supabase
    .from('reports')
    .select(
      'id, category, report, created_at, user_id, users(user_id, first_name)'
    )
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Reports could not be loaded');
  }
  return data;
}

export async function getOpsReports(dateValue) {
  const { data, error } = await supabase
    .from('reports')
    .select(
      'id, category, report, created_at, user_id, users(user_id, first_name)'
    )
    .ilike('category', '%operations%')
    .eq('date', formatDate(dateValue))
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Reports could not be loaded');
  } else {
    return data;
  }
}

export async function getBooksReports(dateValue) {
  const { data, error } = await supabase
    .from('reports')
    .select(
      'id, category, report, created_at, user_id, users(user_id, first_name)'
    )
    .ilike('category', '%bookkeeping%')
    .eq('date', formatDate(dateValue))
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Books could not be loaded');
  } else {
    return data;
  }
}

export async function getBooksReportsWithDate() {
  const { data, error } = await supabase
    .from('reports')
    .select(
      'id, category, report, created_at, date, user_id, users(user_id, first_name)'
    )
    .ilike('category', '%bookkeeping%')
    .order('date');

  if (error) {
    console.error(error);
    throw new Error('Books could not be loaded');
  } else {
    data.map((r) => console.log(r));
    return data;
  }
}

export async function getCustomersReports(dateValue) {
  const { data, error } = await supabase
    .from('reports')
    .select(
      'id, category, report, date, created_at, user_id, users(user_id, first_name)'
    )
    .ilike('category', '%customers%')
    .eq('date', formatDate(dateValue))
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Customers could not be loaded');
  } else {
    return data;
  }
}

export async function getTrainingReports(dateValue) {
  const { data, error } = await supabase
    .from('reports')
    .select(
      'id, category, report, date, created_at, user_id, users(user_id, first_name)'
    )
    .ilike('category', '%training%')
    .eq('date', formatDate(dateValue))
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Training could not be loaded');
  } else {
    return data;
  }
}

export async function getOtherReports(dateValue) {
  const { data, error } = await supabase
    .from('reports')
    .select(
      'id, category, report, date, created_at, user_id, users(user_id, first_name)'
    )
    .ilike('category', '%other%')
    .eq('date', formatDate(dateValue))

    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('"Others" could not be loaded');
  } else {
    return data;
  }
}

export async function getAttendanceReports(dateValue) {
  // const convertedDateValue = new Date(dateValue).toISOString().slice(0, 10);
  // console.log(`Converted Date Value: ${convertedDateValue}`);
  const { data, error } = await supabase
    .from('reports')
    .select(
      'id, category, report, date, created_at, user_id, users(user_id, first_name)'
    )
    .ilike('category', '%attendance%')
    .eq('date', formatDate(dateValue))
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('"Attendance" could not be loaded');
  } else {
    return data;
  }
}

export async function getCategories() {
  const { data, error } = await supabase.from('reports').select('id, category');

  if (error) {
    console.error(error);
    throw new Error('Reports could not be loaded');
  }
  return data;
}

export async function submitReport(newReport) {
  const { report, userId, category } = newReport;
  const { error } = await supabase
    .from('reports')
    .insert([{ report: report, user_id: userId, category: category }]);

  if (error) {
    console.error(error);
    throw new Error('Reports could not be loaded');
  }
}
