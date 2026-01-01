import pandas as pd


def extract_customers(file_path):
    customers_dataframe = pd.read_csv(file_path)
    return customers_dataframe


def extract_products(file_path):
    products_dataframe = pd.read_csv(file_path)
    return products_dataframe


def extract_transactions(file_path):
    transactions_dataframe = pd.read_csv(file_path)
    return transactions_dataframe
