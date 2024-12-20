import supabase from './supabase.js';

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

export async function getOpsReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .ilike('category', '%operations%')
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Reports could not be loaded');
  } else {
    return data;
  }
}

export async function getBooksReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .ilike('category', '%bookkeeping%')
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Books could not be loaded');
  } else {
    return data;
  }
}

export async function getCustomersReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .ilike('category', '%customers%')
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Customers could not be loaded');
  } else {
    return data;
  }
}

export async function getTrainingReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .ilike('category', '%training%')
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Training could not be loaded');
  } else {
    return data;
  }
}

export async function getCategories() {
  // const convertedDateValue = new Date(dateValue).toISOString().slice(0, 10);
  // console.log(`Converted Date Value: ${convertedDateValue}`);
  const { data, error } = await supabase.from('reports').select('id, category');
  // .order('category', { ascending: true });

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
