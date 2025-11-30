from sqlmodel import Session, select
from typing import List, Optional
from .model import GlossaryTerm, TermCreateUpdate

def get_terms(db: Session, skip: int = 0, limit: int = 100) -> List[GlossaryTerm]:
	state = select(GlossaryTerm).offset(skip).limit(limit)
	return db.exec(state).all()

def get_term_by_keyword(db: Session, keyword: str) -> Optional[GlossaryTerm]:
    statement = select(GlossaryTerm).where(GlossaryTerm.term.ilike(keyword))
    return db.exec(statement).first()

def get_term_by_id(db: Session, term_id: int) -> Optional[GlossaryTerm]:
    return db.get(GlossaryTerm, term_id)

def create_term(db: Session, term_data: TermCreateUpdate) -> GlossaryTerm:
	db_term = GlossaryTerm.model_validate(term_data)
	db.add(db_term)
	db.commit()
	db.refresh(db_term)
	return db_term

def update_term(db: Session, db_term: GlossaryTerm, term_data: TermCreateUpdate) -> GlossaryTerm:
	term_data_dict = term_data.model_dump(exclude_unset=True)
	db_term.model_validate(term_data_dict, update=True)
	db.add(db_term)
	db.commit()
	db.refresh(db_term)
	return db_term

def delete_term(db: Session, db_term: GlossaryTerm):
	db.delete(db_term)
	db.commit()