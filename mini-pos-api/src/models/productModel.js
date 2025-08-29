import { supabase } from '../config/supabaseClient.js';

export async function createProduct({ name, price = 0, stock = 0 }) {
    const { data, error } = await supabase
        .from('products')
        .insert([{ name, price, stock }])
        .select()
    if (error) throw error;
    return data[0];
}

export async function getAllProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
}

export async function getProductById(id) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
}

export async function updateProduct(id, fields) {
    const { data, error } = await supabase
        .from('products')
        .update(fields)
        .eq('id', id)
        .select();
    if (error) throw error;
    return data[0];
}

export async function deleteProduct(id) {
    const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .select();
    if (error) throw error;
    return data[0];
}

export default { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };