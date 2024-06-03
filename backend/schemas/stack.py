from pydantic import BaseModel
from typing import Optional


class StackSchema(BaseModel):
    id: int
    title: str
    gradient: Optional[str] = None
