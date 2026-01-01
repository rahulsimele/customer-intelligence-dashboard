import pandas as pd


def transform_transactions(transactions_df, products_df):
    # Merge transactions with products to get price
    merged_dataframe = transactions_df.merge(
        products_df,
        on="product_id",
        how="left"
    )

    # Calculate total amount per transaction
    merged_dataframe["total_amount"] = (
        merged_dataframe["quantity"] * merged_dataframe["price"]
    )

    # Convert date column to datetime
    merged_dataframe["transaction_date"] = pd.to_datetime(
        merged_dataframe["transaction_date"]
    )

    return merged_dataframe


def calculate_customer_metrics(transactions_df):
    customer_metrics_dataframe = (
        transactions_df
        .groupby("customer_id")
        .agg(
            total_spent=("total_amount", "sum"),
            total_orders=("transaction_id", "count"),
            last_purchase_date=("transaction_date", "max")
        )
        .reset_index()
    )

    return customer_metrics_dataframe
