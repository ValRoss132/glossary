from sqlmodel import Field, SQLModel
from typing import Optional

class GlossaryTerm(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	term: str = Field(index=True, unique=True, min_length=2, max_length=100)
	definition: str = Field(min_length=10)
	source: str = Field(min_length=5) 



class GlossaryTermUpdate(SQLModel):
	term: Optional[str] = Field(min_length=2, max_length=100)
	definition: Optional[str] = Field(default=None, min_length=10)
	source: Optional[str] = Field(min_length=5) 


