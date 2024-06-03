from pydantic import BaseModel
from typing import Optional


class WorkCreateDto(BaseModel):
    title: str
    description_short: Optional[str] = None
    description_full: Optional[str] = None
    # category: Optional[] = None
    # stack: Optional[] = None
    # image: Optional[] = None
    # url: Optional[] = None
    is_active: Optional[bool] = None


class WorkUpdateDto(BaseModel):
    title: Optional[str] = None
    description_short: Optional[str] = None
    description_full: Optional[str] = None
    is_active: Optional[bool] = None
