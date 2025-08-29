import { supabase } from '../config/supabaseClient.js';

async function createTransaction({ items }) {
    const { data: products, error: prodErr } = await supabase.from('products').select('*');
    if (prodErr) throw prodErr;

    const productMap = new Map(products.map(p => [p.id, p]));

    let total = 0;
    const itemsToInsert = [];

    for (const it of items) {
        const product = productMap.get(it.product_id);
        if (!product) throw new Error(`Product not found: ${it.product_id}`);
        if (product.stock < it.quantity) throw new Error(`Insufficient stock for product ${product.id}`);

        const price = Number(product.price);
        const subtotal = Number((price * it.quantity).toFixed(2));
        total += subtotal;
        itemsToInsert.push({ product_id: product.id, quantity: it.quantity, price, subtotal });
    }

    const { data: txnData, error: txnErr } = await supabase
        .from('transactions')
        .insert([{ total }])
        .select();
    if (txnErr) throw txnErr;
    const transaction = txnData[0];
    const payloadItems = itemsToInsert.map(it => ({
        transaction_id: transaction.id,
        product_id: it.product_id,
        quantity: it.quantity,
        price: it.price,
        subtotal: it.subtotal,
    }));

    const { data: insertedItems, error: itemsErr } = await supabase
        .from('transaction_items')
        .insert(payloadItems)
        .select();
    if (itemsErr) throw itemsErr;

    for (const it of items) {
        const product = productMap.get(it.product_id);
        const newStock = product.stock - it.quantity;
        const { error: updateErr } = await supabase
            .from('products')
            .update({ stock: newStock })
            .eq('id', it.product_id);
        if (updateErr) throw updateErr;
    }

    return {
        transaction,
        items: insertedItems,
    };
}

async function getAllTransactions() {
    const { data, error } = await supabase
        .from('transactions')
        .select('*, transaction_items(*)')
        .order('id', { ascending: false });
    if (error) throw error;
    return data;
}

async function getTransactionById(id) {
    const { data, error } = await supabase
        .from('transactions')
        .select('*, transaction_items(*)')

    .eq('id', id)
        .maybeSingle();
    if (error) throw error;
    return data;
}


export default { createTransaction, getAllTransactions, getTransactionById };