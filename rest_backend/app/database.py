from sqlmodel import Session, SQLModel, create_engine
from fastapi import Depends
from typing import Annotated
from .model import GlossaryTerm

sqlite_file_name = 'glossary.db'
sqlite_url = f'sqlite:///{sqlite_file_name}'

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
	print("Инициализация базы данных и создание таблиц...")
	SQLModel.metadata.create_all(engine)
	print("Таблицы успешно созданы/проверены.")

def get_session():
	with Session(engine) as session:
		yield session

SessionDep = Annotated[Session, Depends(get_session)]