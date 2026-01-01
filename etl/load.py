from sqlalchemy import create_engine


def load_to_postgres(dataframe, table_name):
    engine = create_engine(
        "postgresql://postgres:rahul@localhost:5432/customer_intelligence"

    )

    dataframe.to_sql(
        table_name,
        engine,
        if_exists="replace",
        index=False
    )
