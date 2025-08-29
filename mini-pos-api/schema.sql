-- Product table
create table public.products (
  id uuid not null default gen_random_uuid (),
  name text not null,
  price bigint not null,
  stock bigint not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint products_pkey primary key (id)
) TABLESPACE pg_default;

create trigger trg_products_updated_at BEFORE
update on products for EACH row
execute FUNCTION update_updated_at ();


-- Transaction Items table
create table public.transaction_items (
  id uuid not null default gen_random_uuid (),
  transaction_id uuid null,
  product_id uuid null,
  quantity integer not null,
  price numeric(12, 2) not null,
  subtotal numeric(12, 2) not null,
  constraint transaction_items_pkey primary key (id),
  constraint transaction_items_product_id_fkey foreign KEY (product_id) references products (id),
  constraint transaction_items_transaction_id_fkey foreign KEY (transaction_id) references transactions (id) on delete CASCADE
) TABLESPACE pg_default;


-- Transaction table
create table public.transactions (
  id uuid not null default gen_random_uuid (),
  total numeric(12, 2) not null,
  created_at timestamp with time zone null default now(),
  constraint transactions_pkey primary key (id)
) TABLESPACE pg_default;