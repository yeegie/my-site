from pydantic import BaseModel
from typing import Optional


class StackCreateDto(BaseModel):
    title: str
    gradient: Optional[str] = None
