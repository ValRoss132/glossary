import os
from sqlmodel import Session, SQLModel, create_engine
from fastapi import Depends
from typing import Annotated
from .model import GlossaryTerm

DATABASE_URL = os.environ.get(
    "DATABASE_URL", 
    "sqlite:///./data/glossary.db"
)

if DATABASE_URL.startswith("sqlite:///"):
    file_path = DATABASE_URL.replace("sqlite:///", "")
    DATABASE_URL = f"sqlite:///file:{file_path}?uri=true"

connect_args = {"check_same_thread": False}
engine = create_engine(DATABASE_URL, connect_args=connect_args)

print(f"DEBUG: Database URL used: {DATABASE_URL}")

def create_db_and_tables():
	print("Инициализация базы данных и создание таблиц...")
	SQLModel.metadata.create_all(engine)
	print("Таблицы успешно созданы/проверены.")

def get_session():
	with Session(engine) as session:
		yield session

SessionDep = Annotated[Session, Depends(get_session)]