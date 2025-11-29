from fastapi import FastAPI;
from .api import glossary;
from .database import create_db_and_tables
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan_event(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(
	title='Glossary API',
	description='API-сервис глоссария терминов ВКР',
	version='1.0.0',
	lifespan=lifespan_event
)

app.include_router(glossary.router)

@app.get('/', include_in_schema=False)
async def root():
	return {"message": "Welcome to the Glossary API. Visit /docs for documentation."}