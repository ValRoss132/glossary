from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List
from .. import model, crud
from ..database import SessionDep

router = APIRouter(
	prefix='/terms',
	tags=['Глоссарий']
)

@router.get('/', response_model=List[model.GlossaryTerm], summary='Получить все термины')
def read_terms(db: SessionDep, skip: int = 0, limit: int = 100):
	terms = crud.get_terms(db, skip=skip, limit=limit)
	return terms

@router.get('/keyword/{keyword}', response_model=model.GlossaryTerm, summary='Получить термин по ключевому слову')
def read_term_by_keyword(db: SessionDep, keyword: str):
	db_term = crud.get_term_by_keyword(db, keyword=keyword)
	if db_term is None:
		raise HTTPException(status_code=404, detail=f"Термин '{keyword}' не найден")
	return db_term

@router.post('/', response_model=model.GlossaryTerm, status_code=status.HTTP_201_CREATED, summary='Добавить новый термин')
def write_term(db: SessionDep, term: model.GlossaryTermUpdate):
	db_term = crud.get_term_by_keyword(db, keyword=term.term)
	if db_term:
		raise HTTPException(status_code=400, detail=f"Термин '{term.term}' уже существует.")
	return crud.create_term(db=db, term_data=term)

@router.put('/{term_id}', summary='Обновить существующий термин')
def update_term(term_id: int, db: SessionDep, term: model.GlossaryTermUpdate):
	db_term = crud.get_term_by_id(db, term_id=term_id)
	if db_term is None:
		raise HTTPException(status_code=404, detail=f"Термин с ID={term_id} не найден.")
	return crud.update_term(db=db, db_term=db_term, term_data=term)

@router.delete('/{term_id}', status_code=status.HTTP_204_NO_CONTENT, summary='Удалить термин')
def update_term(term_id: int, db: SessionDep):
	db_term = crud.get_term_by_id(db, term_id=term_id)
	if db_term is None:
		raise HTTPException(status_code=404, detail=f"Термин с ID={term_id} не найден.")
	crud.delete_term(db=db, db_term=db_term)
	return