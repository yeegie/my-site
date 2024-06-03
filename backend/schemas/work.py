from pydantic import BaseModel

from .category import CategorySchema
from .stack import StackSchema
from .image import ImageSchema
from .link import LinkSchema

from typing import Optional, List


class WorkSchema(BaseModel):
    id: int
    title: str
    description_short: Optional[str] = None
    description_full: Optional[str] = None
    category: Optional[List[CategorySchema]] = None
    stack: Optional[List[StackSchema]] = None
    image: Optional[List[ImageSchema]] = None
    url: Optional[List[LinkSchema]] = None
    is_active: bool
