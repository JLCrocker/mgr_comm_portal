import supabase from './supabase';

export async function getEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('id, first_name, last_name')
    .order('id', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Employees could not be loaded');
  }
  return data;
}
