import supabase from './supabase';

export async function getUsers() {
  // const convertedDateValue = new Date(dateValue).toISOString().slice(0, 10);
  // console.log(`Converted Date Value: ${convertedDateValue}`);
  const { data, error } = await supabase
    .from('users')
    .select('user_id, first_name')
    .order('user_id', { ascending: true });
  // .order('category', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Reports could not be loaded');
  }
  return data;
}
