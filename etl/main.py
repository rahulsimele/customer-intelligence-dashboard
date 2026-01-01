from extract import extract_customers, extract_products, extract_transactions
from transform import transform_transactions, calculate_customer_metrics
from load import load_to_postgres


# ---------- EXTRACT ----------
customers_df = extract_customers("data/customers.csv")
products_df = extract_products("data/products.csv")
transactions_df = extract_transactions("data/transactions.csv")


# ---------- TRANSFORM ----------
enriched_transactions_df = transform_transactions(
    transactions_df,
    products_df
)

customer_metrics_df = calculate_customer_metrics(
    enriched_transactions_df
)


# ---------- LOAD ----------
load_to_postgres(customers_df, "customers")
load_to_postgres(products_df, "products")
load_to_postgres(enriched_transactions_df, "transactions")
load_to_postgres(customer_metrics_df, "customer_metrics")

print("ETL Pipeline Executed Successfully")
