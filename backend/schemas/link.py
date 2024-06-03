from pydantic import BaseModel
from typing import Optional


class LinkSchema(BaseModel):
    id: int
    type: str
    title: Optional[str] = None
    url: Optional[str] = None
