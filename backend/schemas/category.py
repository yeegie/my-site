from pydantic import BaseModel
from typing import Optional


class CategorySchema(BaseModel):
    id: int
    title: str
    description: Optional[str]
    is_active: bool
